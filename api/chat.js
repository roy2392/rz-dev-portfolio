const https = require("https");

const SYSTEM_PROMPT = `You are a helpful AI assistant on Roey Zalta's personal portfolio website.
Roey is a Machine Learning Engineer and AI Developer based in Israel.

Key facts about Roey:
- Specializes in Machine Learning, Deep Learning, NLP, and Generative AI
- Experienced with Python, PyTorch, TensorFlow, LangChain, and cloud platforms (AWS, GCP, Azure)
- Has built projects including: Chat with Websites via LLM Agent, Chat-GPThrones (Neo4j knowledge graph chatbot), multi-agent research assistants, and various ML/DL projects
- Active on LinkedIn sharing AI/ML insights and personal growth content
- GitHub: github.com/roy2392
- Has documented years of personal growth, insights from books, podcasts, and professional experience

Keep responses concise, friendly, and helpful. If asked about something you don't know about Roey, say so honestly rather than guessing. You can also help visitors understand ML/AI concepts.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ detail: "Server misconfigured" });
  }

  const { message, messages } = req.body || {};

  if (!message || typeof message !== "string" || message.length > 2000) {
    return res.status(400).json({ detail: "Invalid message" });
  }

  if (messages && (!Array.isArray(messages) || messages.length > 30)) {
    return res.status(400).json({ detail: "Invalid messages history" });
  }

  // Build conversation history (last 10 messages for context)
  const history = (messages || [])
    .filter((m) => m.role && m.content)
    .slice(-10)
    .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }));

  // Add the new user message
  history.push({ role: "user", content: message });

  const payload = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    max_tokens: 512,
    temperature: 0.7,
    stream: true,
  });

  // Set up streaming response
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const controller = new AbortController();
  req.on("close", () => controller.abort());

  try {
    await new Promise((resolve, reject) => {
      const options = {
        hostname: "models.inference.ai.azure.com",
        path: "/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(payload),
        },
        signal: controller.signal,
      };

      const request = https.request(options, (upstream) => {
        if (upstream.statusCode >= 400) {
          let errorBody = "";
          upstream.on("data", (chunk) => (errorBody += chunk));
          upstream.on("end", () => {
            console.error("Upstream error:", upstream.statusCode, errorBody);
            if (!res.headersSent) {
              res.status(502).json({ detail: "Failed to get response from AI" });
            }
            resolve();
          });
          return;
        }

        let sseBuffer = "";

        upstream.on("data", (chunk) => {
          if (controller.signal.aborted) return;

          sseBuffer += chunk.toString();
          const events = sseBuffer.split("\n\n");
          sseBuffer = events.pop() || "";

          for (const event of events) {
            const lines = event.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  res.write(`0:${JSON.stringify(delta)}\n`);
                }
              } catch (e) {
                // Skip malformed JSON
              }
            }
          }
        });

        upstream.on("end", () => {
          // Flush remaining buffer
          if (sseBuffer.trim()) {
            const lines = sseBuffer.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  res.write(`0:${JSON.stringify(delta)}\n`);
                }
              } catch (e) {}
            }
          }
          res.end();
          resolve();
        });

        upstream.on("error", (err) => {
          console.error("Upstream stream error:", err.message);
          if (!res.headersSent) {
            res.status(502).json({ detail: "Stream error from AI" });
          }
          resolve();
        });
      });

      request.on("error", (err) => {
        if (err.name === "AbortError") {
          resolve();
          return;
        }
        console.error("Request error:", err.message);
        if (!res.headersSent) {
          res.status(502).json({ detail: "Failed to connect to AI" });
        }
        resolve();
      });

      request.setTimeout(30000, () => {
        request.destroy();
        if (!res.headersSent) {
          res.status(504).json({ detail: "Request timeout" });
        }
        resolve();
      });

      request.write(payload);
      request.end();
    });
  } catch (err) {
    console.error("Chat API error:", err.message);
    if (!res.headersSent) {
      res.status(502).json({ detail: "Failed to get response from AI" });
    }
  }
};

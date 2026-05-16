import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'

const MEDIUM_ARTICLES = [
  { id: 1, title: "Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything", description: "A deep dive into multi-agent system architectures — when to use sub-agents vs coordinated agent teams in production.", date: "Apr 25, 2026", link: "https://medium.com/@roeyzalta/sub-agents-vs-agent-teams-the-architecture-decision-that-changes-everything-2abf440704ec", tags: ["multi-agent", "architecture"] },
  { id: 2, title: "Claude Managed Agents + Azure: The Multi-Cloud AI Strategy", description: "How to deploy Claude managed agents on Azure for a multi-cloud AI strategy.", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-azure-the-multi-cloud-ai-strategy-nobodys-talking-about-76da68b16877", tags: ["azure", "claude"] },
  { id: 3, title: "Claude Managed Agents: Deploy Your First Production Agent", description: "Step-by-step guide to deploying your first production-ready Claude managed agent.", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-deploy-your-first-production-agent-in-10-minutes-8af00f608209", tags: ["agentic-ai", "claude"] },
  { id: 4, title: "I Let My AI Agent Improve Itself Overnight", description: "An experiment in self-improving AI agents — letting an agent iterate on its own performance overnight.", date: "Apr 6, 2026", link: "https://medium.com/@roeyzalta/i-let-my-ai-agent-improve-itself-overnight-heres-what-happened-8f8b0cc5e502", tags: ["ml", "ai-agents"] },
  { id: 5, title: "Securing MCP Servers in Production with Azure API Management", description: "A practical guide to securing Model Context Protocol servers using Azure APIM.", date: "Feb 9, 2026", link: "https://medium.com/@roeyzalta/securing-mcp-servers-in-production-with-azure-api-management-b7b22bba5d72", tags: ["mcp", "security"] },
  { id: 6, title: "Setting Up Azure SQL Server with Entra ID Authentication", description: "Step-by-step guide to configuring Azure SQL with modern Entra ID authentication.", date: "Jan 15, 2026", link: "https://medium.com/@roeyzalta/complete-guide-setting-up-azure-sql-server-with-microsoft-entra-id-authentication-2026-edition-dfe6bb19b228", tags: ["azure", "sql"] },
  { id: 7, title: "Production Multi-Agent Systems: 6 Months of Lessons", description: "Six months of lessons from building and deploying multi-agent systems in production.", date: "Aug 30, 2025", link: "https://medium.com/@roeyzalta/taking-production-multi-agent-systems-from-zero-to-hero-6-months-of-real-world-lessons-bb6d49024aab", tags: ["multi-agent", "production"] },
  { id: 8, title: "LLMOps on AWS Part 3: Prompt Engineering on Bedrock", description: "Advanced prompt engineering techniques for production LLM applications on AWS Bedrock.", date: "Feb 22, 2025", link: "https://medium.com/@roeyzalta/llmops-on-aws-part-3-mastering-prompt-engineering-management-on-amazon-bedrock-2569d9c54000", tags: ["llmops", "aws"] },
  { id: 9, title: "LLMOps on AWS Part 2: Model Fine-Tuning on Bedrock", description: "Deep dive into fine-tuning LLMs and evaluating model performance on AWS Bedrock.", date: "Feb 2, 2025", link: "https://medium.com/@roeyzalta/llmops-on-aws-part-2-advanced-model-fine-tuning-and-evaluation-on-aws-bedrock-f9d9fca934fa", tags: ["llmops", "fine-tuning"] },
  { id: 10, title: "LLMOps on AWS: Production GenAI with Bedrock", description: "A comprehensive guide to building production-ready generative AI applications.", date: "Jan 18, 2025", link: "https://medium.com/@roeyzalta/llmops-on-aws-building-production-ready-genai-applications-with-bedrock-b29a792c88b7", tags: ["llmops", "aws"] }
];

export const BlogSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 400); return () => clearTimeout(t); }, []);

  return (
    <div className="py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2">Blog</h1>
        <p className="text-zinc-500 mb-8">Writing about AI systems, LLMOps, and engineering</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {MEDIUM_ARTICLES.map((article, i) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="group flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-zinc-900/50 transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                  <span className="text-[11px] text-zinc-600">{article.date}</span>
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-zinc-500 border border-white/[0.04]">{tag}</span>
                  ))}
                </div>
                <h2 className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors duration-300 mb-1 line-clamp-1">
                  {article.title}
                </h2>
                <p className="text-xs text-zinc-500 line-clamp-1">{article.description}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
            </motion.a>
          ))}
        </div>
      )}

      <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
          All articles on Medium <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  )
} 
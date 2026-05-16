import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { GlowCard } from '../../ui/GlowCard'

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
  const featured = MEDIUM_ARTICLES[0]
  const rest = MEDIUM_ARTICLES.slice(1)

  return (
    <div className="py-24 md:py-32">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-2">Blog</h1>
        <p className="text-zinc-500 mb-10">Writing about AI systems, LLMOps, and engineering</p>
      </motion.div>

      {/* Featured article — large card */}
      <motion.a
        href={featured.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="group block rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-8 md:p-10 mb-8 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-blue-400">Latest</span>
          <span className="text-zinc-700">-</span>
          <Clock className="w-3 h-3 text-zinc-600" />
          <span className="text-xs text-zinc-600">{featured.date}</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors duration-300 mb-3 max-w-3xl">
          {featured.title}
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed mb-5">{featured.description}</p>
        <div className="flex items-center gap-2">
          {featured.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-white/[0.04] text-zinc-500 border border-white/[0.04]">{tag}</span>
          ))}
          <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors ml-auto" />
        </div>
      </motion.a>

      {/* Article grid — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rest.map((article, i) => (
          <GlowCard
            key={article.id}
            as="a"
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3 h-3 text-zinc-600" />
                <span className="text-[11px] text-zinc-600">{article.date}</span>
                {article.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-zinc-500 border border-white/[0.04]">{tag}</span>
                ))}
              </div>
              <h2 className="text-sm font-semibold text-zinc-200 group-hover/card:text-blue-400 transition-colors duration-300 mb-1.5 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs text-zinc-500 line-clamp-2">{article.description}</p>
            </motion.div>
          </GlowCard>
        ))}
      </div>

      <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
          All articles on Medium <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  )
} 
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Clock, Tag } from 'lucide-react'
import { MagneticCard } from '../../ui/MagneticCard'

// Real Medium articles from RSS feed
const MEDIUM_ARTICLES = [
  {
    id: 1,
    title: "Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything",
    description: "A deep dive into multi-agent system architectures — when to use sub-agents vs coordinated agent teams in production.",
    date: "Apr 25, 2026",
    link: "https://medium.com/@roeyzalta/sub-agents-vs-agent-teams-the-architecture-decision-that-changes-everything-2abf440704ec",
    tags: ["multi-agent-systems", "software-architecture", "ai-agent"],
    image: "https://images.unsplash.com/photo-1677442135100-3545673d05e0?q=80&w=1932&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Claude Managed Agents + Azure: The Multi-Cloud AI Strategy Nobody's Talking About",
    description: "How to deploy Claude managed agents on Azure for a multi-cloud AI strategy that combines the best of both worlds.",
    date: "Apr 9, 2026",
    link: "https://medium.com/@roeyzalta/claude-managed-agents-azure-the-multi-cloud-ai-strategy-nobodys-talking-about-76da68b16877",
    tags: ["azure", "claude", "multi-cloud"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1772&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Claude Managed Agents: Deploy Your First Production Agent in 10 Minutes",
    description: "Step-by-step guide to deploying your first production-ready Claude managed agent with Anthropic's platform.",
    date: "Apr 9, 2026",
    link: "https://medium.com/@roeyzalta/claude-managed-agents-deploy-your-first-production-agent-in-10-minutes-8af00f608209",
    tags: ["agentic-ai", "claude", "anthropic"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1932&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "I Let My AI Agent Improve Itself Overnight. Here's What Happened.",
    description: "An experiment in self-improving AI agents — letting an agent iterate on its own performance overnight with surprising results.",
    date: "Apr 6, 2026",
    link: "https://medium.com/@roeyzalta/i-let-my-ai-agent-improve-itself-overnight-heres-what-happened-8f8b0cc5e502",
    tags: ["machine-learning", "artificial-intelligence"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Securing MCP Servers in Production with Azure API Management",
    description: "A practical guide to securing Model Context Protocol (MCP) servers using Azure API Management for enterprise deployments.",
    date: "Feb 9, 2026",
    link: "https://medium.com/@roeyzalta/securing-mcp-servers-in-production-with-azure-api-management-b7b22bba5d72",
    tags: ["microsoft-azure", "mcp-server", "security"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Complete Guide: Setting Up Azure SQL Server with Microsoft Entra ID Authentication (2026 Edition)",
    description: "Step-by-step guide to configuring Azure SQL with modern Entra ID authentication for secure database access.",
    date: "Jan 15, 2026",
    link: "https://medium.com/@roeyzalta/complete-guide-setting-up-azure-sql-server-with-microsoft-entra-id-authentication-2026-edition-dfe6bb19b228",
    tags: ["azure", "sql", "entra-id"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1936&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Taking Production Multi-Agent Systems from Zero to Hero: 6 Months of Real-World Lessons",
    description: "Six months of lessons from building and deploying multi-agent systems in production with AWS Bedrock.",
    date: "Aug 30, 2025",
    link: "https://medium.com/@roeyzalta/taking-production-multi-agent-systems-from-zero-to-hero-6-months-of-real-world-lessons-bb6d49024aab",
    tags: ["aws-bedrock", "ai-agent", "multi-agent-systems"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "LLMOps on AWS Part 3: Mastering Prompt Engineering & Management on Amazon Bedrock",
    description: "Advanced prompt engineering techniques and management strategies for production LLM applications on AWS Bedrock.",
    date: "Feb 22, 2025",
    link: "https://medium.com/@roeyzalta/llmops-on-aws-part-3-mastering-prompt-engineering-management-on-amazon-bedrock-2569d9c54000",
    tags: ["llmops", "prompt-engineering", "aws-bedrock"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "LLMOps on AWS — Part 2: Advanced Model Fine-Tuning and Evaluation on AWS Bedrock",
    description: "Deep dive into fine-tuning LLMs and evaluating model performance on AWS Bedrock for production workloads.",
    date: "Feb 2, 2025",
    link: "https://medium.com/@roeyzalta/llmops-on-aws-part-2-advanced-model-fine-tuning-and-evaluation-on-aws-bedrock-f9d9fca934fa",
    tags: ["llmops", "fine-tuning", "aws-bedrock"],
    image: "https://images.unsplash.com/photo-1580894897591-ff1e18c89183?q=80&w=1970&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "LLMOps on AWS: Building Production-Ready GenAI Applications with Bedrock",
    description: "A comprehensive guide to building production-ready generative AI applications using AWS Bedrock and LLMOps practices.",
    date: "Jan 18, 2025",
    link: "https://medium.com/@roeyzalta/llmops-on-aws-building-production-ready-genai-applications-with-bedrock-b29a792c88b7",
    tags: ["llmops", "aws", "aws-bedrock", "mlops"],
    image: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?q=80&w=1974&auto=format&fit=crop"
  }
];

export const BlogSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Articles</h1>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-white/10 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIUM_ARTICLES.map((article) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: article.id * 0.08 }}
            >
              <MagneticCard className="h-full" glowColor={article.id % 3 === 0 ? 'purple' : article.id % 3 === 1 ? 'pink' : 'blue'}>
                <article className="h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-gray-900 rounded-t-2xl">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/1e293b/e2e8f0?text=${encodeURIComponent(article.title.substring(0, 30) + "...")}`;
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors line-clamp-2">{article.title}</h2>
                  <p className="text-gray-400 mb-4 flex-grow line-clamp-2">{article.description}</p>
                  {article.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors">
                      <span>Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                </article>
              </MagneticCard>
            </motion.a>
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <a 
          href="https://medium.com/@roeyzalta"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors inline-flex items-center gap-2 font-medium"
        >
          <span>View all articles on Medium</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
} 
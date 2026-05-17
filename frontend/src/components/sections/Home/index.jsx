import { motion } from 'framer-motion'
import { ChatBox } from './ChatBox'
import { getPersonalInfo } from '../../../config/configLoader'
import { Github, Linkedin, FileText, Mail, ArrowUpRight, Clock, Star, GitBranch, Brain, Server, Database, Bot, Cloud, Cpu, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useGithubRepos } from '../../../hooks/useGithubRepos'
import { FEATURED_PROJECTS } from '../../../services/github'

const EASE = [0.32, 0.72, 0, 1]

const MEDIUM_ARTICLES = [
  { id: 1, title: "Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything", date: "Apr 25, 2026", link: "https://medium.com/@roeyzalta/sub-agents-vs-agent-teams-the-architecture-decision-that-changes-everything-2abf440704ec", tags: ["multi-agent", "architecture"] },
  { id: 2, title: "Claude Managed Agents + Azure: The Multi-Cloud AI Strategy", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-azure-the-multi-cloud-ai-strategy-nobodys-talking-about-76da68b16877", tags: ["azure", "claude"] },
  { id: 3, title: "Claude Managed Agents: Deploy Your First Production Agent", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-deploy-your-first-production-agent-in-10-minutes-8af00f608209", tags: ["agentic-ai", "claude"] },
  { id: 4, title: "I Let My AI Agent Improve Itself Overnight", date: "Apr 6, 2026", link: "https://medium.com/@roeyzalta/i-let-my-ai-agent-improve-itself-overnight-heres-what-happened-8f8b0cc5e502", tags: ["ml", "ai-agents"] },
  { id: 5, title: "Securing MCP Servers in Production with Azure API Management", date: "Feb 9, 2026", link: "https://medium.com/@roeyzalta/securing-mcp-servers-in-production-with-azure-api-management-b7b22bba5d72", tags: ["mcp", "security"] },
  { id: 6, title: "Production Multi-Agent Systems: 6 Months of Lessons", date: "Aug 30, 2025", link: "https://medium.com/@roeyzalta/taking-production-multi-agent-systems-from-zero-to-hero-6-months-of-real-world-lessons-bb6d49024aab", tags: ["multi-agent", "production"] },
]

const EXPERTISE = [
  { icon: Brain, title: 'Multi-Agent Systems', desc: 'Designing and deploying production multi-agent architectures — sub-agents, orchestrators, tool-use chains — on AWS and Azure.' },
  { icon: Server, title: 'LLMOps & MLOps', desc: 'End-to-end pipelines on AWS Bedrock and Azure AI: model fine-tuning, evaluation, prompt management, CI/CD for ML.' },
  { icon: Database, title: 'RAG Systems', desc: 'Retrieval-augmented generation over internal knowledge bases with vector search, chunking strategies, and hybrid retrieval.' },
  { icon: Bot, title: 'AI Agents & Automation', desc: 'Custom AI agents that automate workflows — from self-improving agents to MCP server integrations and tool orchestration.' },
  { icon: Cloud, title: 'Cloud & Infrastructure', desc: 'AWS (Bedrock, SageMaker, Lambda), Azure (AI Foundry, OpenAI Service), Docker, serverless architectures.' },
  { icon: Cpu, title: 'Generative AI Applications', desc: 'Production GenAI apps: chatbots, content pipelines, code assistants, and enterprise AI integrations that ship.' },
]

const SKILLS = [
  { category: 'AI / ML', items: ['Multi-Agent Systems', 'LLMOps', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'LangChain', 'CrewAI'] },
  { category: 'Cloud', items: ['AWS Bedrock', 'Azure AI', 'SageMaker', 'Lambda', 'Docker', 'Vercel'] },
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Tailwind CSS'] },
]

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Go: '#00ADD8', Shell: '#89e051',
}

const Reveal = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `all 0.8s cubic-bezier(0.32, 0.72, 0, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export const HomeSection = () => {
  const personalInfo = getPersonalInfo()
  const { repos, totalStars, primaryLanguages } = useGithubRepos('roy2392')
  const displayRepos = (repos.length > 0 ? repos : FEATURED_PROJECTS).slice(0, 6)

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO — Full-screen with profile background
      ═══════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-[92vh] flex items-end pb-16 md:pb-24 -mx-6 md:-mx-10 -mt-28 px-6 md:px-10">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/profile.jpg"
            alt={personalInfo.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-[#09090b]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 to-transparent" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative z-10 max-w-[1200px] mx-auto w-full"
        >
          <p className="text-blue-400 text-sm font-mono font-medium tracking-wider mb-4">
            Machine Learning Engineer
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest leading-[0.95] mb-5">
            {personalInfo.name}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed mb-8">
            I build production multi-agent systems, LLMOps pipelines, and AI applications that ship. Deep expertise in RAG, prompt engineering, and agentic frameworks on AWS and Azure.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: 'https://github.com/roy2392', icon: Github, label: 'GitHub' },
              { href: 'https://linkedin.com/in/roeyzalta', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://medium.com/@roeyzalta', icon: FileText, label: 'Medium' },
              { href: 'mailto:roey.zalta@gmail.com', icon: Mail, label: 'Contact' },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-sm text-zinc-200 hover:text-white hover:bg-white/[0.14] hover:border-white/[0.2] transition-all duration-300">
                <Icon className="w-4 h-4" /> {label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT ME
      ═══════════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-8">About me</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-5">
                I am Roey Zalta, a Machine Learning Engineer focused on building AI systems that work in production — not just in notebooks. I specialize in multi-agent architectures, LLMOps pipelines, and retrieval-augmented generation on AWS and Azure.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-5">
                Over the past years I have built production multi-agent systems from scratch, deployed LLMOps pipelines on AWS Bedrock, designed RAG architectures over enterprise knowledge bases, and integrated LLMs (Claude, GPT, Gemini) into real products used by real people.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                I write the code myself. I architect the systems. I ship them to production. If you have a concrete AI problem, I will give you a realistic assessment — not a pitch deck.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl bg-zinc-900/60 border border-white/[0.06] p-6">
                <h3 className="text-sm font-mono text-blue-400 mb-4">Quick facts</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Focus', 'Multi-Agent Systems & LLMOps'],
                    ['Cloud', 'AWS Bedrock, Azure AI Foundry'],
                    ['Languages', 'Python, JavaScript, TypeScript'],
                    ['Writing', '10+ articles on Medium'],
                    ['GitHub', `${repos.length || '100+'}  repositories`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-zinc-500">{label}</dt>
                      <dd className="text-zinc-200 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          EXPERTISE — Service cards grid (like reference)
      ═══════════════════════════════════════════════════ */}
      <section id="expertise" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-3">Expertise</h2>
          <p className="text-zinc-500 mb-12 max-w-xl">What I build and what I know best.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERTISE.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="group rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-6 h-full hover:border-white/[0.12] hover:bg-zinc-900/70 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-display text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════ */}
      <section id="skills" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-12">Skills</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ category, items }, i) => (
            <Reveal key={category} delay={i * 80}>
              <div>
                <h3 className="text-sm font-mono text-blue-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROJECTS — Featured repos grid
      ═══════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-3">Projects</h2>
              <p className="text-zinc-500">Open-source work and experiments</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5"><Github className="w-4 h-4" /> {repos.length || '100+'} repos</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {totalStars} stars</span>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayRepos.map((repo, i) => (
            <Reveal key={repo.id || repo.name} delay={i * 50}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-5 h-full hover:border-white/[0.12] hover:bg-zinc-900/70 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors truncate pr-2">
                    {repo.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-4">
                  {repo.description || 'No description'}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#888' }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" />{repo.forks_count}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300} className="mt-8">
          <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
            View all projects on GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          BLOG — Latest articles
      ═══════════════════════════════════════════════════ */}
      <section id="blog" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-3">Blog</h2>
          <p className="text-zinc-500 mb-12">Writing about AI systems, LLMOps, and engineering</p>
        </Reveal>

        {/* Featured article */}
        <Reveal>
          <a
            href={MEDIUM_ARTICLES[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-8 md:p-10 mb-6 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-blue-400">Latest</span>
              <span className="text-zinc-700">·</span>
              <span className="text-xs text-zinc-600">{MEDIUM_ARTICLES[0].date}</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors mb-3 max-w-3xl">
              {MEDIUM_ARTICLES[0].title}
            </h3>
            <div className="flex items-center gap-2">
              {MEDIUM_ARTICLES[0].tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-white/[0.04] text-zinc-500 border border-white/[0.04]">{tag}</span>
              ))}
            </div>
          </a>
        </Reveal>

        {/* Rest of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {MEDIUM_ARTICLES.slice(1).map((article, i) => (
            <Reveal key={article.id} delay={i * 50}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-3 h-3 text-zinc-600" />
                  <span className="text-[11px] text-zinc-600">{article.date}</span>
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded-md bg-white/[0.03] text-zinc-500">{tag}</span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
            All articles on Medium <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          AI CHAT
      ═══════════════════════════════════════════════════ */}
      <section id="chat" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-3">Ask my AI</h2>
          <p className="text-zinc-500 mb-10">Trained on my writings and experience. Ask me anything.</p>
        </Reveal>
        <Reveal delay={100}>
          <ChatBox />
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER / CONTACT
      ═══════════════════════════════════════════════════ */}
      <footer id="contact" className="py-24 md:py-32 border-t border-white/[0.04]">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-3">Let's talk</h2>
          <p className="text-zinc-400 mb-10 max-w-xl">
            Looking for an ML engineer? Have a project idea? I'm available for consulting, collaboration, and full-time roles.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:roey.zalta@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-sm text-white transition-colors duration-300">
              <Mail className="w-4 h-4" /> roey.zalta@gmail.com
            </a>
            <a href="https://linkedin.com/in/roeyzalta" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </Reveal>
        <div className="mt-16 pt-8 border-t border-white/[0.04] text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Roey Zalta. Built with React + Tailwind.
        </div>
      </footer>
    </div>
  )
} 
import { ChatBox } from './ChatBox'
import { getPersonalInfo } from '../../../config/configLoader'
import { Github, Linkedin, FileText, Mail, ArrowUpRight, Clock, Star, GitBranch, Brain, Server, Database, Bot, Cloud, Cpu, ExternalLink } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useGithubRepos } from '../../../hooks/useGithubRepos'
import { FEATURED_PROJECTS } from '../../../services/github'

const MEDIUM_ARTICLES = [
  { id: 1, title: "Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything", date: "Apr 25, 2026", link: "https://medium.com/@roeyzalta/sub-agents-vs-agent-teams-the-architecture-decision-that-changes-everything-2abf440704ec", tags: ["multi-agent", "architecture"] },
  { id: 2, title: "Claude Managed Agents + Azure: The Multi-Cloud AI Strategy", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-azure-the-multi-cloud-ai-strategy-nobodys-talking-about-76da68b16877", tags: ["azure", "claude"] },
  { id: 3, title: "Claude Managed Agents: Deploy Your First Production Agent", date: "Apr 9, 2026", link: "https://medium.com/@roeyzalta/claude-managed-agents-deploy-your-first-production-agent-in-10-minutes-8af00f608209", tags: ["agentic-ai"] },
  { id: 4, title: "I Let My AI Agent Improve Itself Overnight", date: "Apr 6, 2026", link: "https://medium.com/@roeyzalta/i-let-my-ai-agent-improve-itself-overnight-heres-what-happened-8f8b0cc5e502", tags: ["ai-agents"] },
  { id: 5, title: "Securing MCP Servers in Production with Azure API Management", date: "Feb 9, 2026", link: "https://medium.com/@roeyzalta/securing-mcp-servers-in-production-with-azure-api-management-b7b22bba5d72", tags: ["mcp", "security"] },
  { id: 6, title: "Production Multi-Agent Systems: 6 Months of Lessons", date: "Aug 30, 2025", link: "https://medium.com/@roeyzalta/taking-production-multi-agent-systems-from-zero-to-hero-6-months-of-real-world-lessons-bb6d49024aab", tags: ["multi-agent"] },
]

const EXPERTISE = [
  { icon: Brain, title: 'Multi-Agent Systems', desc: 'Production multi-agent architectures — sub-agents, orchestrators, tool-use chains — on AWS and Azure.', featured: true },
  { icon: Server, title: 'LLMOps & MLOps', desc: 'End-to-end pipelines on AWS Bedrock and Azure AI: model fine-tuning, evaluation, prompt management.' },
  { icon: Database, title: 'RAG Systems', desc: 'Retrieval-augmented generation with vector search, chunking strategies, and hybrid retrieval.' },
  { icon: Bot, title: 'AI Agents & Automation', desc: 'Custom AI agents that automate workflows — MCP server integrations and tool orchestration.' },
  { icon: Cloud, title: 'Cloud & Infrastructure', desc: 'AWS Bedrock, SageMaker, Lambda, Azure AI Foundry, Docker, serverless architectures.' },
  { icon: Cpu, title: 'Generative AI Apps', desc: 'Production GenAI apps: chatbots, content pipelines, code assistants, enterprise integrations.' },
]

const SKILLS = [
  { category: 'AI / ML', items: ['Multi-Agent Systems', 'LLMOps', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'LangChain', 'CrewAI'] },
  { category: 'Cloud', items: ['AWS Bedrock', 'Azure AI', 'SageMaker', 'Lambda', 'Docker', 'Vercel'] },
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Tailwind CSS'] },
]

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', Go: '#00ADD8', Shell: '#89e051',
}

const Reveal = ({ children, className = '' }) => {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div ref={ref} className={className}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
      {children}
    </div>
  )
}

export const HomeSection = () => {
  const personalInfo = getPersonalInfo()
  const { repos, totalStars } = useGithubRepos('roy2392')
  const displayRepos = (repos.length > 0 ? repos : FEATURED_PROJECTS).slice(0, 6)

  return (
    <div>
      {/* ════ HERO ════ */}
      <section id="hero" className="py-16 lg:py-24">
        <div className="relative rounded-2xl overflow-hidden border-2 border-ink mb-8"
          style={{ boxShadow: '0 6px 0 0 #bcb8ae, 0 6px 0 2px #1a1a1a' }}>
          <img src="/profile.jpg" alt={personalInfo.name}
            className="w-full h-[350px] lg:h-[450px] object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <p className="text-accent font-mono text-sm font-medium tracking-wider mb-2">Machine Learning Engineer</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {personalInfo.name}
            </h1>
            <p className="text-white/80 text-base lg:text-lg max-w-xl leading-relaxed">
              I build production multi-agent systems, LLMOps pipelines, and AI applications that ship.
            </p>
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-6">About me</h2>
          <div className="border-l-[3px] border-accent pl-4 mb-6">
            <p className="text-lg font-semibold text-ink leading-relaxed">
              I build AI systems that work in production — not just in notebooks. Specializing in multi-agent architectures, LLMOps, and RAG on AWS and Azure.
            </p>
          </div>
          <p className="text-ink-light leading-relaxed mb-4">
            Over the past years I have built production multi-agent systems from scratch, deployed LLMOps pipelines on AWS Bedrock, designed RAG architectures over enterprise knowledge bases, and integrated LLMs (Claude, GPT, Gemini) into real products.
          </p>
          <p className="text-ink-muted leading-relaxed mb-6">
            I write the code myself. I architect the systems. I ship them to production. If you have a concrete AI problem, I will give you a realistic assessment — not a pitch deck.
          </p>
          <div className="retro-card p-4 inline-block">
            <p className="text-[13px] text-ink-muted leading-relaxed">
              <strong className="text-ink">Focus:</strong> Multi-Agent Systems, LLMOps, RAG, Prompt Engineering &middot;
              <strong className="text-ink"> Cloud:</strong> AWS Bedrock, Azure AI Foundry &middot;
              <strong className="text-ink"> GitHub:</strong> {repos.length || '100+'} repositories
            </p>
          </div>
        </Reveal>
      </section>

      {/* ════ EXPERTISE ════ */}
      <section id="expertise" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-2">Expertise</h2>
          <p className="text-ink-muted mb-8">What I build and what I know best.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERTISE.map(({ icon: Icon, title, desc, featured }) => (
            <Reveal key={title}>
              <div className={`retro-card p-5 h-full ${featured ? '!border-accent' : ''}`}
                style={featured ? { boxShadow: '0 4px 0 0 rgba(0,153,229,0.35), 0 4px 0 2px #0099e5' } : undefined}>
                {featured && <span className="absolute top-2 right-3 text-accent text-xs">&#9733;</span>}
                <div className="relative">
                  <Icon className="w-6 h-6 text-accent mb-4" />
                  <h3 className="font-serif text-base font-bold text-ink mb-2">{title}</h3>
                  <p className="text-[13px] text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════ SKILLS ════ */}
      <section id="skills" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-8">Skills</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ category, items }) => (
            <Reveal key={category}>
              <h3 className="text-sm font-mono text-accent font-medium mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span key={item} className="px-2.5 py-1 rounded-md text-xs font-medium text-ink-light border border-ink/20 bg-parchment-light">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════ PROJECTS ════ */}
      <section id="projects" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-2">Projects</h2>
          <p className="text-ink-muted mb-8">Open-source work — {repos.length || '100+'} repositories, {totalStars} stars</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayRepos.map((repo) => (
            <Reveal key={repo.id || repo.name}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="retro-card block p-5 h-full group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-sans font-semibold text-ink group-hover:text-accent transition-colors truncate pr-2">
                    {repo.name}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-2 mb-3">
                  {repo.description || 'No description'}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-ink-faint">
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
        <Reveal className="mt-6">
          <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer" className="retro-btn">
            <Github className="w-4 h-4" /> All projects on GitHub
          </a>
        </Reveal>
      </section>

      {/* ════ BLOG ════ */}
      <section id="blog" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-2">Blog</h2>
          <p className="text-ink-muted mb-8">Writing about AI systems, LLMOps, and engineering</p>
        </Reveal>
        <div className="space-y-3">
          {MEDIUM_ARTICLES.map((article) => (
            <Reveal key={article.id}>
              <a href={article.link} target="_blank" rel="noopener noreferrer"
                className="retro-card group flex items-start gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-ink-faint">{article.date}</span>
                    {article.tags.map(tag => (
                      <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded bg-accent/10 text-accent">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-sans font-semibold text-ink group-hover:text-accent transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer" className="retro-btn">
            <FileText className="w-4 h-4" /> All articles on Medium
          </a>
        </Reveal>
      </section>

      {/* ════ AI CHAT ════ */}
      <section id="chat" className="py-12 lg:py-16">
        <Reveal>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-ink mb-2">Ask my AI</h2>
          <p className="text-ink-muted mb-8">Trained on my writings and experience. Ask me anything.</p>
        </Reveal>
        <Reveal>
          <ChatBox />
        </Reveal>
      </section>

      {/* ════ CONTACT / CTA ════ */}
      <section id="contact" className="py-12 lg:py-16">
        <Reveal>
          <div className="retro-card p-6 lg:p-8">
            <h2 className="font-serif text-2xl font-bold text-ink mb-2">Let's talk about your project</h2>
            <p className="text-ink-muted mb-6">Reply within 24h, even for a quick chat.</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:roey.zalta@gmail.com" className="retro-btn retro-btn-primary">
                <Mail className="w-4 h-4" /> Email me
              </a>
              <a href="https://linkedin.com/in/roeyzalta" target="_blank" rel="noopener noreferrer" className="retro-btn">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
} 
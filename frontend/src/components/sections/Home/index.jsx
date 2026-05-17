import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FolderKanban,
  Github,
  GitBranch,
  Linkedin,
  Mail,
  MessageSquare,
  Server,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { BootSequence } from '../../mac/BootSequence'
import { MacWindow } from '../../mac/MacWindow'
import { Dock } from '../../mac/Dock'
import { TerminalWindow } from '../../mac/TerminalWindow'
import { ChatBox } from './ChatBox'
import { useGithubRepos } from '../../../hooks/useGithubRepos'
import { useIsMobile } from '../../../hooks/useIsMobile'
import { FEATURED_PROJECTS } from '../../../services/github'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', Go: '#00ADD8', Shell: '#89e051',
}

const MEDIUM_ARTICLES = [
  { id: 1, title: 'Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything', date: 'Apr 25, 2026', link: 'https://medium.com/@roeyzalta/sub-agents-vs-agent-teams-the-architecture-decision-that-changes-everything-2abf440704ec', tags: ['multi-agent'] },
  { id: 2, title: 'Claude Managed Agents + Azure: The Multi-Cloud AI Strategy', date: 'Apr 9, 2026', link: 'https://medium.com/@roeyzalta/claude-managed-agents-azure-the-multi-cloud-ai-strategy-nobodys-talking-about-76da68b16877', tags: ['azure'] },
  { id: 3, title: 'Claude Managed Agents: Deploy Your First Production Agent', date: 'Apr 9, 2026', link: 'https://medium.com/@roeyzalta/claude-managed-agents-deploy-your-first-production-agent-in-10-minutes-8af00f608209', tags: ['agentic-ai'] },
  { id: 4, title: 'I Let My AI Agent Improve Itself Overnight', date: 'Apr 6, 2026', link: 'https://medium.com/@roeyzalta/i-let-my-ai-agent-improve-itself-overnight-heres-what-happened-8f8b0cc5e502', tags: ['ai-agents'] },
  { id: 5, title: 'Securing MCP Servers in Production with Azure API Management', date: 'Feb 9, 2026', link: 'https://medium.com/@roeyzalta/securing-mcp-servers-in-production-with-azure-api-management-b7b22bba5d72', tags: ['mcp'] },
  { id: 6, title: 'Production Multi-Agent Systems: 6 Months of Lessons', date: 'Aug 30, 2025', link: 'https://medium.com/@roeyzalta/taking-production-multi-agent-systems-from-zero-to-hero-6-months-of-real-world-lessons-bb6d49024aab', tags: ['multi-agent'] },
]

const EXPERTISE = [
  { icon: Brain, title: 'Multi-Agent Systems', desc: 'Production architectures with sub-agents, orchestrators, and tool-use chains on AWS and Azure.' },
  { icon: Server, title: 'LLMOps & MLOps', desc: 'End-to-end pipelines: model fine-tuning, evaluation, prompt management, CI/CD for ML.' },
  { icon: Database, title: 'RAG Systems', desc: 'Retrieval-augmented generation with vector search, chunking strategies, and hybrid retrieval.' },
  { icon: Bot, title: 'AI Agents', desc: 'Custom agents for workflow automation — MCP servers, tool orchestration, self-improving agents.' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'AWS Bedrock, SageMaker, Lambda, Azure AI Foundry, Docker, serverless architectures.' },
  { icon: Cpu, title: 'GenAI Applications', desc: 'Chatbots, content pipelines, code assistants, and enterprise integrations that ship.' },
]

const SKILLS = [
  { category: 'AI / ML', items: ['Multi-Agent Systems', 'LLMOps', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'LangChain', 'CrewAI'] },
  { category: 'Cloud', items: ['AWS Bedrock', 'Azure AI', 'SageMaker', 'Lambda', 'Docker', 'Vercel'] },
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'FastAPI', 'Node.js', 'Tailwind CSS'] },
]

const WINDOW_CONFIGS = {
  about: { title: 'About — Roey Zalta', x: 80, y: 50, w: 640, h: 460 },
  projects: { title: 'Projects', x: 160, y: 70, w: 720, h: 500 },
  blog: { title: 'Blog — Medium', x: 120, y: 40, w: 660, h: 480 },
  terminal: { title: 'Terminal', x: 200, y: 90, w: 620, h: 400 },
  chat: { title: 'AI Assistant', x: 240, y: 60, w: 600, h: 500 },
  skills: { title: 'Skills & Expertise', x: 100, y: 80, w: 680, h: 460 },
}

const MOBILE_NAV_ITEMS = [
  { id: 'about', label: 'About', icon: Sparkles, type: 'section' },
  { id: 'skills', label: 'Skills', icon: Code2, type: 'section' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, type: 'section' },
  { id: 'blog', label: 'Blog', icon: BookOpen, type: 'section' },
  { id: 'github', label: 'GitHub', icon: Github, href: 'https://github.com/roy2392', type: 'link' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/roeyzalta', type: 'link' },
  { id: 'email', label: 'Email', icon: Mail, href: 'mailto:roey.zalta@gmail.com', type: 'link' },
]

export const HomeSection = () => {
  const [booted, setBooted] = useState(() => sessionStorage.getItem('mac-booted') === 'true')
  const [windows, setWindows] = useState({})
  const [windowOrder, setWindowOrder] = useState([])
  const [minimized, setMinimized] = useState({})
  const { repos, totalStars } = useGithubRepos('roy2392')
  const isMobile = useIsMobile()
  const displayRepos = (repos.length > 0 ? repos : FEATURED_PROJECTS).slice(0, 8)

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem('mac-booted', 'true')
    setBooted(true)
  }, [])

  const openWindow = useCallback((id) => {
    if (id === 'launchpad') {
      const allIds = ['about', 'projects', 'blog', 'terminal', 'chat']
      setWindows(prev => {
        const next = { ...prev }
        allIds.forEach(wid => { next[wid] = true })
        return next
      })
      setMinimized(prev => {
        const next = { ...prev }
        allIds.forEach(wid => { next[wid] = false })
        return next
      })
      setWindowOrder(prev => [...new Set([...prev, ...allIds])])
      return
    }

    setWindows(prev => ({ ...prev, [id]: true }))
    setMinimized(prev => ({ ...prev, [id]: false }))
    setWindowOrder(prev => [...prev.filter(w => w !== id), id])
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => ({ ...prev, [id]: false }))
    setWindowOrder(prev => prev.filter(w => w !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindowOrder(prev => [...prev.filter(w => w !== id), id])
  }, [])

  const minimizeWindow = useCallback((id) => {
    setMinimized(prev => ({ ...prev, [id]: true }))
  }, [])

  const openWindowIds = Object.entries(windows).filter(([, value]) => value).map(([key]) => key)

  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        isMobile ? (
          <MobileView repos={displayRepos} totalStars={totalStars} repoCount={repos.length} />
        ) : (
          <>
            <div className="absolute top-12 left-4 z-10 flex flex-col gap-4 w-full max-w-md p-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="text-6xl font-light mb-1 tabular-nums">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-lg font-medium opacity-80">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                    <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Roey Zalta</h2>
                    <p className="text-sm text-white/60">ML Engineer & AI Architect</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  Building production multi-agent systems, LLMOps pipelines, and AI applications. Deep expertise in RAG and agentic frameworks on AWS & Azure.
                </p>
                <div className="flex gap-4 text-xs text-white/50">
                  <span>{repos.length || '115'}+ repos</span>
                  <span>{totalStars} stars</span>
                  <span>10+ articles</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {Object.entries(WINDOW_CONFIGS).map(([id, cfg]) => (
                windows[id] && !minimized[id] && (
                  <MacWindow
                    key={id}
                    title={cfg.title}
                    isOpen={true}
                    onClose={() => closeWindow(id)}
                    onMinimize={() => minimizeWindow(id)}
                    onFocus={() => focusWindow(id)}
                    zIndex={10 + windowOrder.indexOf(id)}
                    defaultX={cfg.x}
                    defaultY={cfg.y}
                    width={cfg.w}
                    height={cfg.h}
                  >
                    <WindowContent
                      id={id}
                      repos={displayRepos}
                      totalStars={totalStars}
                      repoCount={repos.length}
                    />
                  </MacWindow>
                )
              ))}
            </AnimatePresence>

            <Dock openWindows={openWindowIds} onOpenApp={openWindow} />
          </>
        )
      )}
    </>
  )
}

const MobileView = ({ repos, totalStars, repoCount }) => {
  const [chatOpen, setChatOpen] = useState(false)
  const containerRef = useRef(null)

  const scrollToSection = useCallback((sectionId) => {
    const container = containerRef.current
    const target = document.getElementById(`mobile-${sectionId}`)

    if (!container || !target) return

    const top = target.offsetTop - 24
    container.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-y-auto px-4 pb-32 text-white"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
    >
      <section id="mobile-about" className="mb-5 rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="flex items-start gap-4">
          <img src="/profile.jpg" alt="Roey Zalta" className="h-16 w-16 rounded-2xl border border-white/10 object-cover" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">macOS portfolio</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">Roey Zalta</h1>
            <p className="text-sm text-blue-300">ML Engineer & AI Architect</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/65">
          Building production multi-agent systems, LLMOps pipelines, and AI applications. Deep expertise in RAG and agentic frameworks on AWS & Azure.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/45">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{repoCount || '115'}+ repos</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{totalStars} stars</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">10+ articles</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">GitHub</a>
          <a href="https://linkedin.com/in/roeyzalta" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">LinkedIn</a>
          <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">Medium</a>
        </div>
      </section>

      <MobileSectionCard title="Expertise" subtitle="What I build" id="mobile-skills">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {EXPERTISE.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <Icon className="mb-3 h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-medium text-white/90">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/50">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          {SKILLS.map(({ category, items }) => (
            <div key={category}>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span key={item} className="rounded-full border border-white/8 bg-black/20 px-3 py-1.5 text-xs text-white/65">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MobileSectionCard>

      <MobileSectionCard title="Projects" subtitle="Selected work" id="mobile-projects">
        <div className="space-y-3">
          {repos.map((repo) => (
            <a
              key={repo.id || repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-white/8 bg-white/5 p-4 transition-colors hover:border-white/15 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white/90">{repo.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/50">{repo.description || 'No description available.'}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/30" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/45">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#888' }} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" />{repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      </MobileSectionCard>

      <MobileSectionCard title="Blog" subtitle="Recent writing" id="mobile-blog">
        <div className="space-y-3">
          {MEDIUM_ARTICLES.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-white/8 bg-white/5 p-4 transition-colors hover:border-white/15 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/40">
                    <span>{article.date}</span>
                    {article.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-300">{tag}</span>
                    ))}
                  </div>
                  <h3 className="mt-2 text-sm font-medium leading-5 text-white/85">{article.title}</h3>
                </div>
                <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/25" />
              </div>
            </a>
          ))}
        </div>
      </MobileSectionCard>

      <button
        onClick={() => setChatOpen(true)}
        className="fixed right-4 z-30 flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/20 px-4 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(139,92,246,0.25)] backdrop-blur-xl"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.5rem)' }}
      >
        <MessageSquare className="h-4 w-4" />
        Chat
      </button>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#121826]/95 backdrop-blur-2xl">
          <div
            className="flex items-center justify-between border-b border-white/10 px-4 pb-4"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">AI Assistant</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Chat with Roey&apos;s AI</h2>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden px-2 pb-safe">
            <ChatBox />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/35 px-3 pt-2 backdrop-blur-2xl pb-safe">
        <div className="flex gap-2 overflow-x-auto">
          {MOBILE_NAV_ITEMS.map(({ id, label, icon: Icon, type, href }) => (
            type === 'section' ? (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex min-w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ) : (
              <a
                key={id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex min-w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

const MobileSectionCard = ({ title, subtitle, id, children }) => (
  <section id={id} className="mb-5 rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">{subtitle}</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      </div>
    </div>
    {children}
  </section>
)

const WindowContent = ({ id, repos, totalStars, repoCount }) => {
  switch (id) {
    case 'about': return <AboutContent />
    case 'projects': return <ProjectsContent repos={repos} totalStars={totalStars} repoCount={repoCount} />
    case 'blog': return <BlogContent />
    case 'terminal': return <TerminalWindow />
    case 'chat': return <ChatWindowContent />
    case 'skills': return <SkillsContent />
    default: return null
  }
}

const AboutContent = () => (
  <div className="p-6 space-y-5">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
        <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">Roey Zalta</h1>
        <p className="text-blue-400 text-sm">Machine Learning Engineer & AI Architect</p>
      </div>
    </div>
    <p className="text-white/70 leading-relaxed">
      I build AI systems that work in production — not just in notebooks. Specializing in multi-agent architectures, LLMOps pipelines, and RAG on AWS and Azure.
    </p>
    <p className="text-white/60 leading-relaxed">
      Over the past years I&apos;ve built production multi-agent systems from scratch, deployed LLMOps pipelines on AWS Bedrock, designed RAG architectures over enterprise knowledge bases, and integrated LLMs into real products.
    </p>
    <div className="grid grid-cols-2 gap-3 pt-2">
      {[
        ['Focus', 'Multi-Agent Systems & LLMOps'],
        ['Cloud', 'AWS Bedrock, Azure AI Foundry'],
        ['Languages', 'Python, JS, TypeScript, SQL'],
        ['Writing', '10+ articles on Medium'],
      ].map(([label, value]) => (
        <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/5">
          <div className="text-[11px] text-white/40 uppercase tracking-wider mb-1">{label}</div>
          <div className="text-sm text-white/80">{value}</div>
        </div>
      ))}
    </div>
    <div className="pt-2">
      <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Expertise</h3>
      <div className="grid grid-cols-2 gap-2">
        {EXPERTISE.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
            <Icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-white/90">{title}</div>
              <div className="text-xs text-white/50 leading-relaxed mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const ProjectsContent = ({ repos, totalStars, repoCount }) => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <p className="text-sm text-white/50">{repoCount || '115'}+ repos · {totalStars} stars</p>
      </div>
      <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer"
        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
        View all <ExternalLink className="w-3 h-3" />
      </a>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {repos.map((repo) => (
        <a key={repo.id || repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer"
          className="group bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-white/90 group-hover:text-blue-400 transition-colors truncate pr-2">
              {repo.name}
            </h3>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </div>
          <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">
            {repo.description || 'No description'}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-white/40">
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
      ))}
    </div>
  </div>
)

const BlogContent = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold text-white">Blog</h2>
        <p className="text-sm text-white/50">Writing about AI systems & engineering</p>
      </div>
      <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
        Medium <ExternalLink className="w-3 h-3" />
      </a>
    </div>
    <div className="space-y-2">
      {MEDIUM_ARTICLES.map((article) => (
        <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer"
          className="group flex items-start gap-3 bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-white/40">{article.date}</span>
              {article.tags.map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{tag}</span>
              ))}
            </div>
            <h3 className="text-sm font-medium text-white/80 group-hover:text-blue-400 transition-colors line-clamp-1">
              {article.title}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
        </a>
      ))}
    </div>
  </div>
)

const ChatWindowContent = () => (
  <div className="p-4 h-full flex flex-col">
    <ChatBox />
  </div>
)

const SkillsContent = () => (
  <div className="p-6 space-y-6">
    <h2 className="text-xl font-bold text-white">Skills & Expertise</h2>
    {SKILLS.map(({ category, items }) => (
      <div key={category}>
        <h3 className="text-xs text-blue-400 uppercase tracking-wider mb-3 font-semibold">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/70 hover:bg-white/10 hover:text-white/90 transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)

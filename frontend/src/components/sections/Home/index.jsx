import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  FolderKanban,
  Github,
  GitBranch,
  Linkedin,
  Mail,
  MessageSquare,
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
  { emoji: '🤖', title: 'Multi-Agent Systems', desc: 'Production architectures with sub-agents, orchestrators, and tool-use chains on AWS and Azure.' },
  { emoji: '🔧', title: 'LLMOps & MLOps', desc: 'End-to-end pipelines: model fine-tuning, evaluation, prompt management, CI/CD for ML.' },
  { emoji: '🔍', title: 'RAG Systems', desc: 'Retrieval-augmented generation with vector search, chunking strategies, and hybrid retrieval.' },
  { emoji: '🧩', title: 'AI Agents', desc: 'Custom agents for workflow automation -- MCP servers, tool orchestration, self-improving agents.' },
  { emoji: '☁️', title: 'Cloud Infrastructure', desc: 'AWS Bedrock, SageMaker, Lambda, Azure AI Foundry, Docker, serverless architectures.' },
  { emoji: '⚡', title: 'GenAI Applications', desc: 'Chatbots, content pipelines, code assistants, and enterprise integrations that ship.' },
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
        <>
          <div className={`absolute z-10 flex flex-col gap-3 md:gap-4 p-2 ${isMobile ? 'top-8 inset-x-2' : 'top-12 left-4 w-full max-w-md'}`}>
            <div className="bg-white/[0.12] backdrop-blur-2xl rounded-[22px] p-5 md:p-7 text-white border border-white/[0.12]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px -15px rgba(0,0,0,0.3)' }}>
              <div className="flex flex-col items-center">
                <div className={`font-extralight mb-1 tabular-nums tracking-tight ${isMobile ? 'text-4xl' : 'text-7xl'}`}>
                  {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className={`font-medium opacity-80 ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="relative bg-white/[0.12] backdrop-blur-2xl rounded-[22px] p-5 md:p-7 text-white border border-white/[0.12] overflow-hidden" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px -15px rgba(0,0,0,0.3)' }}>
              {/* Subtle gradient overlay at top */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-[22px] pointer-events-none" />
              <div className="relative flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className={`rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}>
                  <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>Roey Zalta</h2>
                  <p className="text-xs md:text-sm text-white/60">ML Engineer & AI Architect</p>
                </div>
              </div>
              <p className="relative text-xs md:text-sm text-white/70 leading-relaxed mb-2 md:mb-3">
                Building production multi-agent systems, LLMOps pipelines, and AI applications. Deep expertise in RAG and agentic frameworks on AWS & Azure.
              </p>
              <div className="relative flex gap-3 md:gap-4 text-xs text-white/50">
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
  <div className="p-5 md:p-6">
    {/* Profile header */}
    <div className="flex items-start gap-4 pb-5 border-b border-white/[0.06]">
      <div className="w-20 h-20 rounded-[16px] overflow-hidden flex-shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.08]">
        <img src="/profile.jpg" alt="Roey Zalta" className="w-full h-full object-cover" />
      </div>
      <div className="pt-1">
        <h1 className="text-lg font-bold tracking-tight text-white">Roey Zalta</h1>
        <p className="text-sm text-[#007AFF] font-medium mt-0.5">Machine Learning Engineer & AI Architect</p>
        <p className="text-[13px] text-white/50 leading-relaxed mt-2 max-w-[380px]">
          I build AI systems that work in production — not just in notebooks. Multi-agent architectures, LLMOps pipelines, and RAG on AWS and Azure.
        </p>
      </div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-4 gap-2.5 py-4 border-b border-white/[0.06]">
      {[
        ['Focus', 'Multi-Agent'],
        ['Cloud', 'AWS · Azure'],
        ['Languages', 'Py · JS · TS'],
        ['Articles', '10+'],
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg bg-white/[0.04] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-3 py-2.5 text-center">
          <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">{label}</div>
          <div className="text-xs font-medium text-white/80">{value}</div>
        </div>
      ))}
    </div>

    {/* Expertise section */}
    <div className="pt-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3 px-1">Expertise</div>
      <div className="space-y-0 rounded-lg border border-white/[0.06] overflow-hidden">
        {EXPERTISE.map(({ emoji, title, desc }, i) => (
          <div key={title} className={`group flex items-center gap-3 px-3.5 py-3 hover:bg-white/[0.03] transition-colors ${i < EXPERTISE.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <span className="text-base leading-none">{emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-white/85">{title}</div>
              <div className="text-[11px] text-white/40 leading-relaxed mt-0.5 truncate">{desc}</div>
            </div>
            <svg className="w-4 h-4 text-white/15 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const ProjectsContent = ({ repos, totalStars, repoCount }) => (
  <div className="p-5 md:p-6">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-white/40 font-medium">{repoCount || '115'}+ repos · {totalStars} stars</span>
      <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer"
        className="text-[11px] text-[#007AFF] hover:text-[#007AFF]/80 transition-colors font-medium">
        View all on GitHub ↗
      </a>
    </div>

    <div className="rounded-lg border border-white/[0.06] overflow-hidden">
      <div className="hidden md:grid grid-cols-[1fr_100px_56px_56px] gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium border-b border-white/[0.06] bg-white/[0.03]">
        <span>Name</span>
        <span>Language</span>
        <span className="text-right">Stars</span>
        <span className="text-right">Forks</span>
      </div>

      {repos.map((repo, i) => (
        <a key={repo.id || repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer"
          className={`group flex flex-col md:grid md:grid-cols-[1fr_100px_56px_56px] gap-1 md:gap-2 md:items-center px-4 py-3 md:py-2.5 transition-all hover:bg-[#007AFF]/10 active:scale-[0.995] ${i % 2 === 1 ? 'bg-white/[0.015]' : ''} ${i < repos.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
          <div className="min-w-0 flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#007AFF]/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-white/85 group-hover:text-white transition-colors truncate">{repo.name}</div>
              <div className="text-[11px] text-white/30 truncate md:hidden">{repo.description || 'No description'}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-white/60 font-medium" style={{ backgroundColor: `${LANGUAGE_COLORS[repo.language] || '#888'}18` }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#888' }} />
                {repo.language}
              </span>
            )}
          </div>
          <span className="hidden md:flex items-center justify-end gap-1 text-xs text-white/50">
            <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {repo.stargazers_count}
          </span>
          <span className="hidden md:flex items-center justify-end gap-1 text-xs text-white/50">
            <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
            {repo.forks_count}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-white/30 md:hidden">
            <span>★ {repo.stargazers_count}</span>
            <span>⑂ {repo.forks_count}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
)

const TAG_COLORS = {
  'multi-agent': 'bg-[#007AFF]/10 text-[#007AFF]/80',
  'azure': 'bg-[#0078D4]/10 text-[#0078D4]/80',
  'agentic-ai': 'bg-[#34C759]/10 text-[#34C759]/80',
  'ai-agents': 'bg-[#FF9500]/10 text-[#FF9500]/80',
  'mcp': 'bg-[#AF52DE]/10 text-[#AF52DE]/80',
}

const BlogContent = () => (
  <div className="p-5 md:p-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg leading-none">📰</span>
      <span className="text-sm font-semibold text-white/85">Latest Articles</span>
      <span className="flex-1" />
      <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
        className="text-[11px] text-[#007AFF] hover:text-[#007AFF]/80 transition-colors font-medium">
        medium.com/@roeyzalta ↗
      </a>
    </div>

    <div className="rounded-lg border border-white/[0.06] overflow-hidden">
      {MEDIUM_ARTICLES.map((article, i) => (
        <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer"
          className={`group flex items-start gap-3 px-4 py-3.5 transition-all hover:bg-white/[0.03] active:scale-[0.995] ${i < MEDIUM_ARTICLES.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-white/35 font-medium">{article.date}</span>
              {article.tags.map(tag => (
                <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[tag] || 'bg-white/[0.06] text-white/40'}`}>{tag}</span>
              ))}
            </div>
          </div>
          <svg className="w-4 h-4 text-white/15 flex-shrink-0 mt-0.5 group-hover:text-white/30 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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

const CATEGORY_ICONS = {
  'AI / ML': '🧠',
  'Cloud': '☁️',
  'Languages': '⌨️',
  'Frameworks': '⚡',
}

const SkillsContent = () => (
  <div className="p-5 md:p-6 space-y-4">
    {SKILLS.map(({ category, items }) => (
      <div key={category}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.025] border border-white/[0.04] mb-3">
          <span className="text-sm">{CATEGORY_ICONS[category] || '●'}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">{category}</span>
        </div>
        <div className="flex flex-wrap gap-2 px-1">
          {items.map(item => (
            <span key={item} className="px-3.5 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-[12px] text-white/70 font-medium transition-all hover:bg-white/[0.09] active:scale-[0.98]">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)

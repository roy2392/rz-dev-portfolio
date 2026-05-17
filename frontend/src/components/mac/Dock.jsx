import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, FolderOpen, FileText, Terminal, Bot,
  Github, Linkedin, BookOpen, Mail, LayoutGrid
} from 'lucide-react'

const APPS = [
  { id: 'launchpad', label: 'Launchpad', icon: LayoutGrid, color: 'from-gray-600 to-gray-800' },
  { id: 'about', label: 'About Me', icon: User, color: 'from-blue-500 to-blue-700' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'from-amber-500 to-orange-600' },
  { id: 'blog', label: 'Blog', icon: BookOpen, color: 'from-pink-500 to-rose-600' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'from-gray-800 to-black' },
  { id: 'chat', label: 'AI Chat', icon: Bot, color: 'from-violet-500 to-purple-700' },
  { id: 'divider' },
  { id: 'github', label: 'GitHub', icon: Github, color: 'from-gray-700 to-gray-900', url: 'https://github.com/roy2392' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', url: 'https://linkedin.com/in/roeyzalta' },
  { id: 'email', label: 'Email', icon: Mail, color: 'from-sky-400 to-blue-600', url: 'mailto:roey.zalta@gmail.com' },
]

const DockIcon = ({ app, isOpen, onClick, mouseX }) => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const Icon = app.icon

  const getScale = () => {
    if (!ref.current || mouseX === null) return 1
    const rect = ref.current.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const distance = Math.abs(mouseX - center)
    return Math.max(1, 1.5 - distance / 100)
  }

  const scale = getScale()

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-9 bg-black/70 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none"
        >
          {app.label}
        </motion.div>
      )}
      <button
        ref={ref}
        onClick={onClick}
        className={`w-12 h-12 rounded-xl bg-gradient-to-b ${app.color} flex items-center justify-center shadow-lg transition-transform duration-75 hover:shadow-xl`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      >
        <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
      </button>
      {isOpen && (
        <div className="w-1 h-1 rounded-full bg-white/80 mt-1 absolute -bottom-2" />
      )}
    </div>
  )
}

export const Dock = ({ openWindows = [], onOpenApp }) => {
  const [mouseX, setMouseX] = useState(null)

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40"
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      <div className="flex items-end gap-2 px-3 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-lg">
        {APPS.map((app) => {
          if (app.id === 'divider') {
            return <div key="div" className="w-px h-10 bg-white/15 mx-1" />
          }
          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={openWindows.includes(app.id)}
              mouseX={mouseX}
              onClick={() => {
                if (app.url) {
                  window.open(app.url, '_blank')
                } else {
                  onOpenApp(app.id)
                }
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const APPS = [
  { id: 'launchpad', label: 'Launchpad', icon: '/icons/launchpad.svg' },
  { id: 'about', label: 'About Me', icon: '/icons/about.svg' },
  { id: 'projects', label: 'Projects', icon: '/icons/projects.svg' },
  { id: 'blog', label: 'Blog', icon: '/icons/blog.svg' },
  { id: 'terminal', label: 'Terminal', icon: '/icons/terminal.svg' },
  { id: 'chat', label: 'AI Chat', icon: '/icons/chat.svg' },
  { id: 'divider' },
  { id: 'github', label: 'GitHub', icon: '/icons/github.svg', url: 'https://github.com/roy2392' },
  { id: 'linkedin', label: 'LinkedIn', icon: '/icons/linkedin.svg', url: 'https://linkedin.com/in/roeyzalta' },
  { id: 'email', label: 'Email', icon: '/icons/mail.svg', url: 'mailto:roey.zalta@gmail.com' },
]

const DockIcon = ({ app, isOpen, onClick, mouseX }) => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

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
      className="relative flex flex-col items-center flex-shrink-0"
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
        className="w-12 h-12 rounded-[22%] overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-75 hover:shadow-xl"
        style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      >
        <img src={app.icon} alt={app.label} className="w-full h-full" draggable={false} />
      </button>
      {isOpen && (
        <div className="w-[5px] h-[5px] rounded-full bg-[#30d158] mt-1 absolute shadow-[0_0_4px_rgba(48,209,88,0.6)] -bottom-2" />
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
      <div className="flex items-end px-3 pt-2 pb-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-lg gap-2 justify-center">
        {APPS.map((app) => {
          if (app.id === 'divider') {
            return <div key="div" className="bg-white/15 mx-1 flex-shrink-0 w-px h-10" />
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

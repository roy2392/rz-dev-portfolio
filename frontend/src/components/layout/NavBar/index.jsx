import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DesktopNav } from './DesktopNav'

export const NavBar = () => {

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[800px]">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="bg-zinc-900/80 backdrop-blur-2xl border border-white/[0.06] rounded-full px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-300">roey.dev</span>
          </Link>

          <DesktopNav />
        </div>
      </motion.div>
    </nav>
  )
} 
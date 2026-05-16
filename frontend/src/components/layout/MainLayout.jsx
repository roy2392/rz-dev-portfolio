import PropTypes from 'prop-types'
import { NavBar } from './NavBar'
import { CursorGlow } from '../ui/CursorGlow'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export const MainLayout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 overflow-hidden font-sans">
      <CursorGlow />
      {/* Ambient mesh gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/[0.025] blur-[150px]" />
      </div>
      {/* Noise grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          zIndex: 3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      <NavBar />
      <main className="relative pt-28 pb-16 px-6 md:px-10 max-w-[1200px] mx-auto" style={{ zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
} 
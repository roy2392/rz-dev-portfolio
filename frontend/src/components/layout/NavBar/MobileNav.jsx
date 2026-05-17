import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const LINKS = [
  { hash: '#hero', label: 'Home' },
  { hash: '#about', label: 'About' },
  { hash: '#expertise', label: 'Expertise' },
  { hash: '#projects', label: 'Projects' },
  { hash: '#blog', label: 'Blog' },
  { hash: '#chat', label: 'AI Chat' },
  { hash: '#contact', label: 'Contact' },
]

export const MobileNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation()

  const handleClick = (e, hash) => {
    setIsMenuOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="md:hidden mt-3 overflow-hidden"
        >
          <div className="flex flex-col gap-1 pb-2">
            {LINKS.map(({ hash, label }) => (
              <a
                key={hash}
                href={`/${hash}`}
                onClick={(e) => handleClick(e, hash)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired
} 
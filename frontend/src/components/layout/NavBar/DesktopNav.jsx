import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', hash: '#hero', label: 'Home' },
  { to: '/', hash: '#about', label: 'About' },
  { to: '/', hash: '#expertise', label: 'Expertise' },
  { to: '/', hash: '#projects', label: 'Projects' },
  { to: '/', hash: '#blog', label: 'Blog' },
  { to: '/', hash: '#chat', label: 'AI Chat' },
  { to: '/', hash: '#contact', label: 'Contact' },
]

export const DesktopNav = () => {
  const location = useLocation()

  const handleClick = (e, hash) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div className="hidden md:flex items-center gap-0.5">
      {LINKS.map(({ to, hash, label }) => (
        <a
          key={hash}
          href={`${to}${hash}`}
          onClick={(e) => handleClick(e, hash)}
          className="text-[13px] font-medium px-3 py-1.5 rounded-full text-zinc-400 hover:text-zinc-200 transition-colors duration-300"
        >
          {label}
        </a>
      ))}
    </div>
  )
} 
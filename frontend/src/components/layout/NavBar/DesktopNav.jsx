import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/linkedin', label: 'LinkedIn' },
]

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center gap-1">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors duration-300 ${
              isActive
                ? 'text-white bg-white/[0.06]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {label}
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
} 
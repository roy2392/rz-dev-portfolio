import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sections } from '../config/navigationConfig'
import { SocialLinks } from '../shared/SocialLinks'

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex flex-1 items-center justify-between ml-8">
      {/* Navigation Links */}
      <div className="flex space-x-1">
        {Object.entries(sections).map(([key, { icon: Icon, title, path }]) => (
          <NavLink
            key={key}
            to={path}
            className={({ isActive }) => `
              relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300
              ${isActive 
                ? 'text-white' 
                : 'text-gray-400 hover:text-purple-300 hover:bg-white/[0.04]'}
            `}
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4" />
                <span>{title}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.08] rounded-lg border border-purple-500/20"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Social Links */}
      <SocialLinks />
    </div>
  )
} 
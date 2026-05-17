import { motion } from 'framer-motion'
import { getSocialLinksWithIcons, navConfig } from '../config/navigationConfig'

export const SocialLinks = () => {
  const socialLinks = getSocialLinksWithIcons();

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ href, icon: Icon, label, color }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...navConfig.iconAnimation}
          className={`p-2 rounded-lg text-gray-400 ${color} hover:bg-white/5 transition-colors`}
          title={label}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  )
} 
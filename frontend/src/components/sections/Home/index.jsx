import { motion } from 'framer-motion'
import { ChatBox } from './ChatBox'
import { IntroSection } from './IntroSection'
import { getPersonalInfo } from '../../../config/configLoader'
import { Github, Linkedin, FileText } from 'lucide-react'

export const HomeSection = () => {
  const personalInfo = getPersonalInfo();
  
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[calc(100vh-8rem)]"
    >
      {/* Hero — asymmetric split */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center py-12 md:py-20">
        {/* Left — text */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-emerald-400 text-sm font-mono font-medium tracking-wide mb-3">
              Machine learning engineer
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tightest text-zinc-50 leading-[1.05]">
              {personalInfo.name}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed"
          >
            Building production multi-agent systems, LLMOps pipelines, and generative AI applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex items-center gap-3 pt-2"
          >
            <a href="https://github.com/roy2392" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-zinc-300 hover:text-white hover:border-white/[0.15] transition-all duration-300">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://linkedin.com/in/roeyzalta" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-zinc-300 hover:text-white hover:border-white/[0.15] transition-all duration-300">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://medium.com/@roeyzalta" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-zinc-300 hover:text-white hover:border-white/[0.15] transition-all duration-300">
              <FileText className="w-4 h-4" /> Blog
            </a>
          </motion.div>
        </div>

        {/* Right — profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
              <img 
                src="/profile.jpg" 
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Subtle emerald accent dot */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#09090b]" />
          </div>
        </motion.div>
      </div>

      <IntroSection />
      <ChatBox />
    </motion.div>
  )
} 
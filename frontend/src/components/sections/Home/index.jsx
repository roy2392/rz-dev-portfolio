import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { ChatBox } from './ChatBox'
import { IntroSection } from './IntroSection'
import { getPersonalInfo } from '../../../config/configLoader'
import { SparklesEffect } from '../../ui/SparklesEffect'
import { TextReveal, TypewriterText } from '../../ui/TextReveal'

export const HomeSection = () => {
  const personalInfo = getPersonalInfo();
  
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center"
    >
      <motion.div 
        className="mb-4 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <SparklesEffect count={4} color="text-purple-300/60" />
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-purple-500/60 relative ring-4 ring-purple-500/20 ring-offset-4 ring-offset-black shadow-lg shadow-purple-500/20">
          <img 
            src="/profile.jpg" 
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
        </div>
        <motion.div 
          className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Terminal className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </motion.div>
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-relaxed px-4 py-1 bg-clip-text text-transparent bg-[length:300%_100%]"
        style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #ec4899, #818cf8, #c084fc, #a78bfa)' }}
      >
        <TextReveal delay={0.3} stagger={0.05}>
          {personalInfo.name}
        </TextReveal>
      </h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-lg md:text-xl text-gray-400 mb-2"
      >
        <TypewriterText text="Machine Learning Engineer & AI Developer" speed={35} delay={1.0} />
      </motion.p>

      <IntroSection />

      <ChatBox />

    </motion.div>
  )
} 
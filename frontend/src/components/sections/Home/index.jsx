import { motion } from 'framer-motion'
import { ChatBox } from './ChatBox'
import { getPersonalInfo } from '../../../config/configLoader'
import { Github, Linkedin, FileText, Brain } from 'lucide-react'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

const EASE = [0.32, 0.72, 0, 1]

const RevealSection = ({ children, delay = 0, className = '' }) => {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      {children}
    </div>
  )
}

export const HomeSection = () => {
  const personalInfo = getPersonalInfo();
  
  return (
    <div>
      {/* HERO — cinematic center, ultra-wide, per taste-skill */}
      <section className="min-h-[85vh] flex flex-col justify-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-5xl"
        >
          <p className="text-blue-400 text-sm font-mono font-medium tracking-wider mb-6">
            Machine Learning Engineer
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tightest leading-[0.95] mb-6">
            {personalInfo.name}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            Building production multi-agent systems, LLMOps pipelines, and AI applications that ship.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: 'https://github.com/roy2392', icon: Github, label: 'GitHub' },
              { href: 'https://linkedin.com/in/roeyzalta', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://medium.com/@roeyzalta', icon: FileText, label: 'Medium' },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.16] hover:bg-white/[0.06] transition-all duration-300">
                <Icon className="w-4 h-4" /> {label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BENTO — 3 dense cards, per taste-skill: 3-5 intentional cards */}
      <RevealSection className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px] md:auto-rows-[220px]" style={{ gridAutoFlow: 'dense' }}>
          {/* Profile card — spans 4 cols, 2 rows */}
          <div className="md:col-span-4 md:row-span-2 rounded-2xl overflow-hidden border border-white/[0.06] relative group">
            <img
              src="/profile.jpg"
              alt={personalInfo.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-zinc-400">Available for work</span>
              </div>
              <p className="text-sm font-medium text-zinc-200">ML Engineer & AI Architect</p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="md:col-span-4 rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-6 flex flex-col justify-between">
            <span className="text-xs text-zinc-500 font-mono">01</span>
            <div>
              <p className="text-3xl font-display font-bold text-white mb-1">Multi-Agent</p>
              <p className="text-sm text-zinc-500">Production systems on AWS + Azure</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-6 flex flex-col justify-between">
            <span className="text-xs text-zinc-500 font-mono">02</span>
            <div>
              <p className="text-3xl font-display font-bold text-white mb-1">LLMOps</p>
              <p className="text-sm text-zinc-500">Bedrock, RAG, fine-tuning pipelines</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-6 flex flex-col justify-between">
            <span className="text-xs text-zinc-500 font-mono">03</span>
            <div>
              <p className="text-3xl font-display font-bold text-white mb-1">GenAI Apps</p>
              <p className="text-sm text-zinc-500">End-to-end shipping to production</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl bg-blue-500/[0.06] border border-blue-500/10 p-6 flex flex-col justify-between">
            <Brain className="w-5 h-5 text-blue-400/60" />
            <div>
              <p className="text-lg font-display font-semibold text-zinc-100 mb-1">Ask my AI</p>
              <p className="text-xs text-zinc-500">Trained on my work and writings</p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* AI CHAT — massive spacing per taste-skill */}
      <RevealSection className="py-24 md:py-32">
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-8">
          Ask me anything
        </h2>
        <ChatBox />
      </RevealSection>
    </div>
  )
} 
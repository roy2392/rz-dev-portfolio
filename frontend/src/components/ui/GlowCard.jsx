import { useRef, useCallback } from 'react'

export const GlowCard = ({ children, className = '', as: Tag = 'div', ...props }) => {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <Tag
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group/card relative rounded-2xl bg-zinc-900/60 border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {/* Mouse-tracking glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(400px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(59, 130, 246, 0.08), transparent 60%)',
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Tag>
  )
}

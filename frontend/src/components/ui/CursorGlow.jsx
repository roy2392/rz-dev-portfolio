import { useEffect, useRef } from 'react'

export const CursorGlow = () => {
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.setProperty('--glow-x', `${pos.current.x}px`)
            glowRef.current.style.setProperty('--glow-y', `${pos.current.y}px`)
          }
          raf.current = null
        })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{
        background: 'radial-gradient(600px circle at var(--glow-x, -100px) var(--glow-y, -100px), rgba(59, 130, 246, 0.06), transparent 60%)',
      }}
    />
  )
}

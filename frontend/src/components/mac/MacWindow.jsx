import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

export const MacWindow = ({
  title,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex = 10,
  defaultX = 100,
  defaultY = 60,
  width = 600,
  height = 420,
  children,
}) => {
  const [isMaximized, setIsMaximized] = useState(false)
  const isMobile = useIsMobile()

  if (!isOpen) return null

  const fullscreenHeight = 'calc(100vh - env(safe-area-inset-bottom, 0px) - 88px)'
  const isFullscreen = isMobile || isMaximized

  return (
    <motion.div
      drag={!isMobile && !isMaximized}
      dragMomentum={false}
      dragElastic={0}
      initial={{ scale: 0.5, opacity: 0, y: 40 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        ...(isFullscreen && { x: 0, y: 0 }),
      }}
      exit={{ scale: 0.5, opacity: 0, y: 40 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      style={{
        zIndex,
        position: isFullscreen ? 'fixed' : 'absolute',
        top: isMobile ? 0 : isMaximized ? 28 : defaultY,
        left: isFullscreen ? 0 : defaultX,
        width: isFullscreen ? '100vw' : width,
        height: isMobile ? fullscreenHeight : isMaximized ? 'calc(100vh - 28px - 76px)' : height,
      }}
      onPointerDown={onFocus}
      className={`flex flex-col overflow-hidden shadow-2xl shadow-black/40 ${isMobile ? 'rounded-none' : 'rounded-xl'}`}
    >
      <div className={`h-12 bg-[#2D2D2D]/95 backdrop-blur-sm flex items-center px-4 relative flex-shrink-0 border-b border-white/5 ${isMobile ? 'cursor-default pt-safe' : 'cursor-grab active:cursor-grabbing'}`}>
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all group flex items-center justify-center"
          >
            <span className="text-[8px] text-black/0 group-hover:text-black/60 font-bold leading-none">×</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all group flex items-center justify-center"
          >
            <span className="text-[8px] text-black/0 group-hover:text-black/60 font-bold leading-none">−</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); if (!isMobile) setIsMaximized(!isMaximized) }}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all group flex items-center justify-center"
          >
            <span className="text-[7px] text-black/0 group-hover:text-black/60 font-bold leading-none">⤢</span>
          </button>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/60">
          {title}
        </span>
      </div>

      <div className={`flex-1 bg-[#1E1E1E] overflow-y-auto text-white/90 text-sm ${isMobile ? 'pb-6' : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}

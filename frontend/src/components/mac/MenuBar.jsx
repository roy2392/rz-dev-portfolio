import { useState, useEffect } from 'react'

export const MenuBar = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex h-7 bg-black/20 backdrop-blur-md items-center justify-between px-4 text-[13px] text-white/90 select-none z-50 relative">
      <div className="flex items-center space-x-4">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="font-semibold">Finder</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">File</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">Edit</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">View</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">Go</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">Window</span>
        <span className="opacity-80 hover:opacity-100 cursor-default">Help</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="opacity-70">100%</span>
        {/* WiFi */}
        <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        {/* Search */}
        <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <span className="opacity-80">{dateStr}</span>
        <span>{timeStr}</span>
      </div>
    </div>
  )
}

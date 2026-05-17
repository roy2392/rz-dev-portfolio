import { useEffect, useState } from 'react'

export const useIsMobile = (breakpoint = 768) => {
  const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < breakpoint : false)
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)

    handler()
    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return isMobile
}

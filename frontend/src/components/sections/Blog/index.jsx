import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

export const BlogSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const mediumWidgetRef = useRef(null)

  useEffect(() => {
    // Create and inject Medium widget script
    const script = document.createElement('script')
    script.src = 'https://medium-widget.pixelpoint.io/widget.js'
    script.async = true
    
    script.onload = () => {
      // Once script is loaded, initialize the widget
      if (window.MediumWidget) {
        window.MediumWidget.Init({
          renderTo: mediumWidgetRef.current,
          params: {
            resource: '@roeyzalta',
            postsPerLine: 3,
            limit: 6,
            picture: 'big',
            fields: ['title', 'author', 'publishAt', 'description', 'claps', 'url', 'image'],
            ratio: 'landscape',
            cardStyle: 'prominent'
          }
        })
        setIsLoading(false)
      }
    }
    
    document.body.appendChild(script)
    
    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Articles</h1>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <p className="text-gray-400">Loading articles...</p>
        </div>
      )}
      
      <div ref={mediumWidgetRef} className="medium-widget-article-list"></div>
      
      <div className="mt-8 text-center">
        <a 
          href="https://medium.com/@roeyzalta"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2"
        >
          <span>View all articles on Medium</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
} 
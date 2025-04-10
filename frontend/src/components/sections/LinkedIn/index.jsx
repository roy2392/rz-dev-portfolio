import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'

// LinkedIn's oEmbed setup requires direct content URNs
const LINKEDIN_POSTS = [
  {
    urn: 'urn:li:share:7190673444315951104',
    title: 'Claude 3.5 Sonnet Post'
  },
  {
    urn: 'urn:li:share:7172221099973644288',
    title: 'Claude 3 Opus Post'
  }
]

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load the LinkedIn embed script
    const script = document.createElement('script');
    script.src = "https://platform.linkedin.com/in.js";
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Simulate loading for a better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    
    return () => {
      clearTimeout(timer);
      // Clean up the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        LinkedIn Posts
      </motion.h1>
      
      <motion.p 
        className="text-center text-gray-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recent updates and thoughts from my LinkedIn
      </motion.p>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* LinkedIn Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {LINKEDIN_POSTS.map((post, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 rounded-lg p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                <div className="linkedin-post min-h-[400px]">
                  <iframe
                    src={`https://www.linkedin.com/embed/feed/update/${post.urn}`}
                    height="570"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen=""
                    title={post.title}
                    className="rounded"
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile Card */}
          <motion.div
            className="mt-12 bg-white/5 rounded-lg p-6 border border-white/10 max-w-xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Roey Zalta</h2>
                <p className="text-gray-400">Software Engineer & Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Follow me on LinkedIn for more updates and insights on software development, AI, and tech industry trends.
            </p>
          </motion.div>

          {/* View More Link */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a
              href="https://linkedin.com/in/roey-zalta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors inline-flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              <span>View More on LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 
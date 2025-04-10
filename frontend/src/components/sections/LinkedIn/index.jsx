import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load the Juicer.io script
    const juicerScript = document.createElement('script')
    juicerScript.src = 'https://assets.juicer.io/embed.js'
    juicerScript.async = true
    juicerScript.defer = true
    document.body.appendChild(juicerScript)

    // Set a timeout to hide the loading indicator after script loads
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      // Clean up script when component unmounts
      if (document.body.contains(juicerScript)) {
        document.body.removeChild(juicerScript)
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
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* 
            IMPORTANT: Replace "YOUR-FEED-NAME" with your actual Juicer feed name after setup 
            To set up:
            1. Sign up at Juicer.io (requires paid plan for LinkedIn)
            2. Add your LinkedIn profile as a source
            3. Get your feed name and replace it below
            4. Customize options as needed
          */}
          <div className="juicer-feed" data-feed-id="YOUR-FEED-NAME" data-per="4" data-pages="1"
               data-truncate="200" data-overlay="false" data-style="modern"></div>

          {/* Profile Card */}
          <motion.div
            className="mt-12 bg-white/5 rounded-lg p-6 border border-white/10 max-w-xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Roey Zalta</h2>
                <p className="text-gray-400">Software Engineer & Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Experienced full stack developer with expertise in modern web frameworks and AI integration. Passionate about building scalable applications with React, Node.js, and cutting-edge AI models like Claude. I focus on creating elegant solutions to complex problems, with a strong emphasis on code quality and user experience.
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
              className="px-6 py-3 rounded-lg bg-[#0A66C2] hover:bg-[#0a5cb8] transition-colors inline-flex items-center gap-2"
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
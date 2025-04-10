import { motion } from 'framer-motion'
import { Linkedin, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for a better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
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
          {/* LinkedIn Profile Summary */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10 max-w-2xl mb-12 w-full">
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
              Passionate about building innovative web applications and sharing knowledge with the tech community. 
              Follow me on LinkedIn for the latest updates on my projects and insights into modern web development.
            </p>
            <a 
              href="https://linkedin.com/in/roey-zalta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:underline flex items-center gap-1 font-medium"
            >
              <span>View LinkedIn Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          {/* Featured LinkedIn Posts */}
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Post 1 */}
            <motion.div 
              className="bg-white/5 rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Building Scalable Web Applications</h3>
                  <p className="text-sm text-gray-400">Posted 2 weeks ago</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Excited to share my latest insights on building scalable web applications using modern architecture patterns.
                The key to success is a combination of well-structured code, efficient state management, and robust API design.
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>42 likes • 8 comments</span>
                <a 
                  href="https://linkedin.com/in/roey-zalta/recent-activity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:underline flex items-center gap-1"
                >
                  <span>Read more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
            
            {/* Post 2 */}
            <motion.div 
              className="bg-white/5 rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">The Future of Frontend Development</h3>
                  <p className="text-sm text-gray-400">Posted 1 month ago</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                As we move further into 2024, the frontend landscape continues to evolve rapidly. From AI-assisted coding
                to the rise of WebAssembly and the evolution of React server components, there's a lot to be excited about.
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>78 likes • 15 comments</span>
                <a 
                  href="https://linkedin.com/in/roey-zalta/recent-activity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:underline flex items-center gap-1"
                >
                  <span>Read more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
            
            {/* Post 3 */}
            <motion.div 
              className="bg-white/5 rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">My Journey as a Software Engineer</h3>
                  <p className="text-sm text-gray-400">Posted 2 months ago</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Reflecting on my journey in the software industry, I've learned that continuous learning,
                collaboration, and adaptability are the cornerstones of a successful career in tech.
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>95 likes • 23 comments</span>
                <a 
                  href="https://linkedin.com/in/roey-zalta/recent-activity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:underline flex items-center gap-1"
                >
                  <span>Read more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
            
            {/* Post 4 */}
            <motion.div 
              className="bg-white/5 rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-[#0A66C2] flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Open Source Contributions That Matter</h3>
                  <p className="text-sm text-gray-400">Posted 3 months ago</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Contributing to open source projects isn't just about coding. It's about documentation,
                testing, design, and community building. Even small contributions can have a big impact.
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>64 likes • 12 comments</span>
                <a 
                  href="https://linkedin.com/in/roey-zalta/recent-activity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:underline flex items-center gap-1"
                >
                  <span>Read more</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* View More Link */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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
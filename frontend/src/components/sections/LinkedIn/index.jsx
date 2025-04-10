import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'

// Direct LinkedIn post embeds - these are official LinkedIn post URLs
// These will be rendered using LinkedIn's official oEmbed API
const LINKEDIN_POSTS = [
  {
    id: "7148379335723950080", // This is the post ID from the LinkedIn URL
    url: "https://www.linkedin.com/posts/roey-zalta_anthropic-claude-3-5-sonnet-the-most-advanced-activity-7190673444315951104-I-I0"
  },
  {
    id: "7179506835356143616",
    url: "https://www.linkedin.com/posts/roey-zalta_claude-3-opus-is-coming-httpslnkdinuhyidxy-activity-7172221099973644288-7K0P"
  },
  {
    id: "7136006472894332928",
    url: "https://www.linkedin.com/posts/roey-zalta_personal-branding-ugcPost-7136006472894332928-3TGw"
  }
];

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the LinkedIn SDK for post embedding
    const linkedinScript = document.createElement('script');
    linkedinScript.src = 'https://platform.linkedin.com/badges/js/profile.js';
    linkedinScript.async = true;
    linkedinScript.defer = true;
    document.body.appendChild(linkedinScript);

    // Allow some time for the script to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(linkedinScript)) {
        document.body.removeChild(linkedinScript);
      }
    };
  }, []);

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
          {/* LinkedIn Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-10">
            {LINKEDIN_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white/5 rounded-lg p-6 border border-white/10 flex flex-col min-h-[500px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                <div className="linkedin-post-container h-full flex items-center justify-center">
                  <iframe
                    src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${post.id}`}
                    height="450"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen=""
                    title={`LinkedIn Post ${index + 1}`}
                    className="rounded"
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LinkedIn Profile Badge */}
          <motion.div
            className="mt-4 mb-12 w-full max-w-lg flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="badge-base LI-profile-badge" 
                 data-locale="en_US" 
                 data-size="medium" 
                 data-theme="dark" 
                 data-type="VERTICAL" 
                 data-vanity="roey-zalta" 
                 data-version="v1">
              <a className="badge-base__link LI-simple-link" 
                 href="https://il.linkedin.com/in/roey-zalta?trk=profile-badge"
                 target="_blank"
                 rel="noopener noreferrer">
                Roey Zalta
              </a>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="bg-white/5 rounded-lg p-6 border border-white/10 max-w-xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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
            transition={{ delay: 0.8 }}
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
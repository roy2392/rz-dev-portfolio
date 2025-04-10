import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// LinkedIn post embeds directly from user's profile
const LINKEDIN_POSTS = [
  {
    id: "7316011592272293889",
    type: "share",
    title: "Recent LinkedIn Post",
    excerpt: "Check out my latest thoughts"
  },
  {
    id: "7314143555222945795",
    type: "share",
    title: "LinkedIn Update",
    excerpt: "Professional insights and updates"
  },
  {
    id: "7307271507150344192",
    type: "share",
    title: "Tech Thoughts",
    excerpt: "Sharing my perspective on technology"
  },
  {
    id: "7173482642179309568",
    type: "share",
    title: "AI Development",
    excerpt: "Insights on artificial intelligence"
  },
  {
    id: "7266919151477125122",
    type: "share",
    title: "Software Engineering",
    excerpt: "Best practices and approaches"
  },
  {
    id: "7250029938722967554",
    type: "ugcPost",
    title: "Career Development",
    excerpt: "Professional growth strategies"
  }
];

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postLoadErrors, setPostLoadErrors] = useState({});
  const [visiblePosts, setVisiblePosts] = useState(4); // Initially show 4 posts
  const profileBadgeRef = useRef(null);

  // Handle iframe load errors
  const handleIframeError = (postId) => {
    setPostLoadErrors(prev => ({
      ...prev,
      [postId]: true
    }));
  };

  // Load more posts
  const handleLoadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 2, LINKEDIN_POSTS.length));
  };

  useEffect(() => {
    // Set loading to false after some time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
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
            {LINKEDIN_POSTS.slice(0, visiblePosts).map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col min-h-[420px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                {postLoadErrors[post.id] ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <Linkedin className="w-12 h-12 text-[#0A66C2] mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <a 
                      href={`https://linkedin.com/in/roey-zalta`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto px-4 py-2 rounded bg-[#0A66C2] hover:bg-[#0a5cb8] transition-colors"
                    >
                      View on LinkedIn
                    </a>
                  </div>
                ) : (
                  <div className="linkedin-post-container h-full flex items-center justify-center">
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/urn:li:${post.type}:${post.id}?collapsed=1`}
                      height="399"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen=""
                      title={`LinkedIn Post ${index + 1}`}
                      className="rounded"
                      onError={() => handleIframeError(post.id)}
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < LINKEDIN_POSTS.length && (
            <motion.button
              className="mb-10 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
              onClick={handleLoadMore}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Load More Posts</span>
            </motion.button>
          )}

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
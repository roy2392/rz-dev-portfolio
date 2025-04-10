import { motion } from 'framer-motion'
import { Linkedin, ThumbsUp, MessageSquare, Repeat, Send, Heart, Calendar } from 'lucide-react'
import { useState } from 'react'

// LinkedIn post data
const LINKEDIN_POSTS = [
  {
    id: 1,
    author: {
      name: 'Roey Zalta',
      title: 'Software Engineer & Full Stack Developer',
      profilePic: 'https://media.licdn.com/dms/image/D4D03AQEdhRu72SMqoA/profile-displayphoto-shrink_100_100/0/1702197354874?e=1719446400&v=beta&t=uIvqjS_-YNJrRbxJLDJOyxfuE9AX9MHQPYiJwZV3u9s'
    },
    date: 'May 17, 2024',
    content: `Anthropic Claude 3.5 Sonnet: The most advanced AI assistant ever created by Anthropic.
      
      Claude has incredible reasoning capabilities, can solve complex problems accurately, and writes code with exceptional precision.
      
      Claude 3.5 Sonnet is now the smartest AI system in its class according to the MMLU benchmark (90.3%) surpassing GPT-4's score (86.4%).
      
      I can't wait to integrate it into all of my projects!`,
    likes: 87,
    comments: 14,
    url: 'https://www.linkedin.com/posts/roey-zalta_anthropic-claude-3-5-sonnet-the-most-advanced-activity-7190673444315951104-I-I0'
  },
  {
    id: 2,
    author: {
      name: 'Roey Zalta',
      title: 'Software Engineer & Full Stack Developer',
      profilePic: 'https://media.licdn.com/dms/image/D4D03AQEdhRu72SMqoA/profile-displayphoto-shrink_100_100/0/1702197354874?e=1719446400&v=beta&t=uIvqjS_-YNJrRbxJLDJOyxfuE9AX9MHQPYiJwZV3u9s'
    },
    date: 'March 5, 2024',
    content: `Claude 3 Opus is coming!
    
    https://lnkd.in/uhYiDXy
    
    Claude 3 Opus outperforms GPT-4 based on Anthropic's accuracy evaluations on challenging benchmarks.
    
    Anthropic has made Claude more grounded, reduced hallucinations, improved reasoning, and made it more helpful overall.
    
    Claude 3 performs particularly well in STEM, coding, math, and safety evaluations.`,
    likes: 142,
    comments: 23,
    url: 'https://www.linkedin.com/posts/roey-zalta_claude-3-opus-is-coming-httpslnkdinuhyidxy-activity-7172221099973644288-7K0P'
  }
];

export const LinkedInSection = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

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
        className="text-center text-gray-400 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recent updates and thoughts from my LinkedIn
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* LinkedIn Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {LINKEDIN_POSTS.map((post, index) => (
            <motion.div 
              key={post.id}
              className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-blue-400/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Post Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={post.author.profilePic} 
                      alt={post.author.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{post.author.name}</h3>
                    <p className="text-sm text-gray-400">{post.author.title}</p>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-4">
                <div className="text-gray-200 whitespace-pre-line">
                  {post.content}
                </div>
              </div>
              
              {/* Post Engagement */}
              <div className="px-4 py-3 border-t border-white/5">
                <div className="flex justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" fill="#ef4444" />
                    <span>{post.likes} reactions</span>
                  </div>
                  <div>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </div>
              
              {/* Post Actions */}
              <div className="flex border-t border-white/5">
                <a 
                  href="#"
                  className="flex items-center justify-center gap-2 py-3 flex-1 text-gray-400 hover:bg-white/5 transition-colors duration-200"
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm">Like</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center justify-center gap-2 py-3 flex-1 text-gray-400 hover:bg-white/5 transition-colors duration-200"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm">Comment</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center justify-center gap-2 py-3 flex-1 text-gray-400 hover:bg-white/5 transition-colors duration-200"
                >
                  <Repeat className="w-5 h-5" />
                  <span className="text-sm">Repost</span>
                </a>
                <a 
                  href="#"
                  className="flex items-center justify-center gap-2 py-3 flex-1 text-gray-400 hover:bg-white/5 transition-colors duration-200"
                >
                  <Send className="w-5 h-5" />
                  <span className="text-sm">Send</span>
                </a>
              </div>
              
              {/* View on LinkedIn Overlay */}
              <div 
                className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#0A66C2] hover:bg-[#0a5cb8] text-white rounded-md flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>View on LinkedIn</span>
                </a>
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
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src="https://media.licdn.com/dms/image/D4D03AQEdhRu72SMqoA/profile-displayphoto-shrink_100_100/0/1702197354874?e=1719446400&v=beta&t=uIvqjS_-YNJrRbxJLDJOyxfuE9AX9MHQPYiJwZV3u9s" 
                alt="Roey Zalta"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Roey Zalta</h2>
              <p className="text-gray-400">Software Engineer & Full Stack Developer</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            Full stack developer with focus on innovative solutions and problem-solving. Follow me on LinkedIn for more updates and insights on software development, AI, and tech industry trends.
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
    </div>
  )
} 
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'

const LINKEDIN_POSTS = [
  { id: "7317411297799618560", type: "activity", title: "Vibe Coding Productivity", excerpt: "How to improve your productivity 10x with 'Vibe Coding'" },
  { id: "7316011592272293889", type: "share", title: "Recent LinkedIn Post", excerpt: "Check out my latest thoughts" },
  { id: "7314143555222945795", type: "share", title: "LinkedIn Update", excerpt: "Professional insights and updates" },
  { id: "7307271507150344192", type: "share", title: "Tech Thoughts", excerpt: "Sharing my perspective on technology" },
  { id: "7173482642179309568", type: "share", title: "AI Development", excerpt: "Insights on artificial intelligence" },
  { id: "7266919151477125122", type: "share", title: "Software Engineering", excerpt: "Best practices and approaches" },
  { id: "7250029938722967554", type: "ugcPost", title: "Career Development", excerpt: "Professional growth strategies" }
];

const LINKEDIN_PROFILE_URL = "http://linkedin.com/in/roey-zalta";

export const LinkedInSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postLoadErrors, setPostLoadErrors] = useState({});
  const [visiblePosts, setVisiblePosts] = useState(6);

  const handleIframeError = (postId) => {
    setPostLoadErrors(prev => ({ ...prev, [postId]: true }));
  };

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2">LinkedIn</h1>
        <p className="text-zinc-500 mb-8">Recent posts and updates</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {LINKEDIN_POSTS.slice(0, visiblePosts).map((post, index) => (
              <motion.div
                key={post.id}
                className="rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-[1px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="rounded-[15px] bg-zinc-950/60 border border-white/[0.03] p-4 min-h-[400px] flex flex-col">
                  {postLoadErrors[post.id] ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Linkedin className="w-10 h-10 text-[#0A66C2] mb-3" />
                      <h3 className="text-sm font-semibold mb-1 text-zinc-200">{post.title}</h3>
                      <p className="text-xs text-zinc-500 mb-4">{post.excerpt}</p>
                      <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#0a5cb8] text-sm text-white transition-colors">
                        View on LinkedIn
                      </a>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/urn:li:${post.type}:${post.id}?collapsed=1`}
                      height="380"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen=""
                      title={`LinkedIn Post ${index + 1}`}
                      className="rounded-lg"
                      onError={() => handleIframeError(post.id)}
                      loading="lazy"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {visiblePosts < LINKEDIN_POSTS.length && (
            <div className="text-center mb-8">
              <button onClick={() => setVisiblePosts(prev => Math.min(prev + 2, LINKEDIN_POSTS.length))}
                className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
                Load more
              </button>
            </div>
          )}

          {/* Profile card */}
          <motion.div
            className="rounded-2xl bg-zinc-900/40 border border-white/[0.06] p-[1px] max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="rounded-[15px] bg-zinc-950/60 border border-white/[0.03] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-100">Roey Zalta</h2>
                  <p className="text-xs text-zinc-500">Machine Learning Engineer & AI Developer</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Building production multi-agent systems, LLMOps pipelines, and generative AI applications on AWS Bedrock and Azure. Deep expertise in RAG architectures, prompt engineering, and agentic AI frameworks.
              </p>
              <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#0a5cb8] text-sm text-white transition-colors">
                <Linkedin className="w-4 h-4" /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 
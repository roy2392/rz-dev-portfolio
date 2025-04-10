import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Clock } from 'lucide-react'

// Static blog data with your latest Medium posts
const MEDIUM_ARTICLES = [
  {
    id: 1,
    title: "Understanding Fine-Tuning in Large Language Models",
    description: "A comprehensive guide to LLM fine-tuning techniques and their applications in various domains",
    date: "May 18, 2023",
    link: "https://medium.com/@roeyzalta/understanding-fine-tuning-in-large-language-models",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*yx3PCRsdY0duz0VkddYYAw.png"
  },
  {
    id: 2,
    title: "Building RAG Applications with Python and Vector Databases",
    description: "Learn how to implement Retrieval-Augmented Generation systems with open-source tools",
    date: "June 24, 2023",
    link: "https://medium.com/@roeyzalta/building-rag-applications",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*aOox7J1qvfOuqA_GwyQm5Q.jpeg"
  },
  {
    id: 3,
    title: "Machine Learning in Production: Best Practices",
    description: "From prototype to production: strategies for deploying robust ML systems",
    date: "August 12, 2023",
    link: "https://medium.com/@roeyzalta/machine-learning-in-production",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*36MELEhgZsPFUWGUAe4CeA.jpeg"
  },
  {
    id: 4,
    title: "Creating Intelligent Chatbots with Open Source Tools",
    description: "A hands-on guide to building AI-powered conversational interfaces",
    date: "September 5, 2023",
    link: "https://medium.com/@roeyzalta/creating-intelligent-chatbots",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*-UgQBxIxxbdmLY_ait5xLw.jpeg"
  },
  {
    id: 5,
    title: "The Future of AI: Trends to Watch in 2023 and Beyond",
    description: "Exploring emerging technologies and methodologies in artificial intelligence",
    date: "October 20, 2023",
    link: "https://medium.com/@roeyzalta/future-of-ai-trends",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*w3CrCwXksYNm9MxN67BgNg.jpeg"
  },
  {
    id: 6,
    title: "Efficient Data Processing Pipelines with Python",
    description: "Optimizing ETL workflows for large-scale data applications",
    date: "November 15, 2023",
    link: "https://medium.com/@roeyzalta/efficient-data-processing",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*E9gQJ_cMWzzqYqjYZ9mZ5A.jpeg"
  }
];

export const BlogSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Articles</h1>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-white/10 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEDIUM_ARTICLES.map((article) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: article.id * 0.1 }}
            >
              <article className="h-full flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
                <div className="aspect-video w-full overflow-hidden bg-gray-900">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors line-clamp-2">{article.title}</h2>
                  <p className="text-gray-400 mb-4 flex-grow line-clamp-2">{article.description}</p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:text-purple-300 transition-colors">
                      <span>Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <a 
          href="https://medium.com/@roeyzalta"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors inline-flex items-center gap-2 font-medium"
        >
          <span>View all articles on Medium</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
} 
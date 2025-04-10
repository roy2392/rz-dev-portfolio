import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

export const BlogSection = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMediumArticles = async () => {
      try {
        // Use a CORS proxy and the Medium RSS feed
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://medium.com/feed/@roeyzalta')}`)
        if (!response.ok) throw new Error('Failed to fetch articles')
        
        const data = await response.json()
        
        // Parse the XML from the response
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml')
        
        // Extract article info from the XML
        const items = xmlDoc.querySelectorAll('item')
        const parsedArticles = Array.from(items).map(item => {
          // Get the content and extract the first image if available
          const content = item.querySelector('content\\:encoded')?.textContent || ''
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/)
          const imgSrc = imgMatch ? imgMatch[1] : null
          
          // Get publication date and format it
          const pubDate = new Date(item.querySelector('pubDate').textContent)
          const formattedDate = pubDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
          
          return {
            id: item.querySelector('guid').textContent,
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent,
            date: formattedDate,
            description: item.querySelector('description').textContent.split('<p>')[0].replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            imageSrc: imgSrc
          }
        })
        
        setArticles(parsedArticles)
      } catch (err) {
        console.error('Error fetching Medium articles:', err)
        setError('Failed to load articles')
      } finally {
        setLoading(false)
      }
    }
    
    fetchMediumArticles()
  }, [])

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-400">Loading articles...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-red-400">{error}</p>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col h-full"
          >
            {article.imageSrc && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={article.imageSrc}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-sm text-purple-300 mb-2">{article.date}</p>
              <h2 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h2>
              <p className="text-gray-400 mb-4 flex-grow">{article.description}</p>
              <a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors inline-flex items-center gap-2 self-start"
              >
                <span>Read Article</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
      
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
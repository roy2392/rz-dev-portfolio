import { motion } from 'framer-motion'
import { Github, Star, Code, GitBranch, Eye, ExternalLink, Clock } from 'lucide-react'
import { useGithubRepos } from '../../../hooks/useGithubRepos'
import { useState } from 'react'

// Language color mapping
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Ruby: '#701516',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Rust: '#dea584',
  C: '#555555',
  'C#': '#178600',
  'C++': '#f34b7d',
  Shell: '#89e051',
  R: '#198CE7',
  Dart: '#00B4AB',
}

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'recent', name: 'Recently Updated' },
  { id: 'popular', name: 'Most Popular' },
]

export const ProjectsSection = () => {
  const { repos, loading, error, totalStars, primaryLanguages } = useGithubRepos('roy2392', 15)
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredRepo, setHoveredRepo] = useState(null)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">GitHub Projects</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">GitHub Projects</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-400">Error loading projects. Please try again later.</p>
        </div>
      </div>
    )
  }

  // Filter repos based on active category
  const filteredRepos = (() => {
    switch (activeCategory) {
      case 'recent':
        return [...repos].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      case 'popular':
        return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
      default:
        return repos
    }
  })()

  // Get top languages for stats
  const topLanguages = Object.entries(primaryLanguages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        GitHub Projects
      </motion.h1>
      
      <motion.p 
        className="text-center text-gray-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Showcasing my latest work and open-source contributions
      </motion.p>

      {/* GitHub Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Github className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Repositories</h3>
          </div>
          <p className="text-3xl font-bold">{repos.length}</p>
          <p className="text-sm text-gray-400 mt-1">Public projects</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Total Stars</h3>
          </div>
          <p className="text-3xl font-bold">{totalStars}</p>
          <p className="text-sm text-gray-400 mt-1">From all repositories</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Code className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold">Top Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {topLanguages.map(([lang, count]) => (
              <span 
                key={lang} 
                className="flex items-center gap-1 text-sm rounded-full px-2 py-1 bg-white/10"
                style={{ borderLeft: `3px solid ${LANGUAGE_COLORS[lang] || '#ccc'}` }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="flex justify-center gap-2 mb-8 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {filteredRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            onMouseEnter={() => setHoveredRepo(repo.id)}
            onMouseLeave={() => setHoveredRepo(null)}
            className="group h-full"
          >
            <div className="relative h-full flex flex-col bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5">
              {/* Header with Language */}
              <div className="flex items-center justify-between px-5 pt-5">
                <div className="flex items-center">
                  <Github className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-bold truncate group-hover:text-purple-400 transition-colors">
                    {repo.name}
                  </h3>
                </div>
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#ccc' }}
                    />
                    <span className="text-xs text-gray-400">{repo.language}</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="p-5 flex-grow">
                <p className="text-gray-400 text-sm line-clamp-3">
                  {repo.description || 'No description available'}
                </p>
              </div>
              
              {/* Footer with Stats */}
              <div className="px-5 pb-5 pt-2 border-t border-white/5 mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                    {repo.watchers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Overlay button on hover */}
              <div 
                className={`absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
                  hoveredRepo === repo.id ? 'opacity-100' : ''
                }`}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors flex items-center gap-2"
                >
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View More Link */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href={`https://github.com/${repos[0]?.owner.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors inline-flex items-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>View All on GitHub</span>
        </a>
      </motion.div>
    </div>
  )
} 
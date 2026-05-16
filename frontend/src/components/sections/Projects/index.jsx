import { motion } from 'framer-motion'
import { Github, Star, GitBranch, Clock, Search, ArrowUpRight, RefreshCw } from 'lucide-react'
import { useGithubRepos } from '../../../hooks/useGithubRepos'
import { useState, useMemo } from 'react'
import { GlowCard } from '../../ui/GlowCard'
import { FEATURED_PROJECTS } from '../../../services/github'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Ruby: '#701516',
  Go: '#00ADD8', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF',
  Rust: '#dea584', C: '#555555', 'C#': '#178600', 'C++': '#f34b7d',
  Shell: '#89e051', R: '#198CE7', Dart: '#00B4AB',
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'recent', name: 'Recent' },
  { id: 'popular', name: 'Popular' },
]

export const ProjectsSection = () => {
  const { repos, loading, error, totalStars, primaryLanguages } = useGithubRepos('roy2392')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [visibleCount, setVisibleCount] = useState(12)

  const displayRepos = repos.length > 0 ? repos : FEATURED_PROJECTS

  const filteredRepos = useMemo(() => {
    let result = [...displayRepos]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(r => r.name.toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q) || (r.topics || []).some(t => t.toLowerCase().includes(q)))
    }
    if (selectedLanguage !== 'all') result = result.filter(r => r.language === selectedLanguage)
    switch (activeCategory) {
      case 'recent': return result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      case 'popular': return result.sort((a, b) => b.stargazers_count - a.stargazers_count)
      default: return result
    }
  }, [displayRepos, activeCategory, searchQuery, selectedLanguage])

  const topLanguages = Object.entries(primaryLanguages).sort((a, b) => b[1] - a[1]).slice(0, 6)

  if (loading) {
    return (
      <div className="py-24 md:py-32">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-8">Projects</h1>
        <div className="flex justify-center items-center h-64">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="py-24 md:py-32">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tightest mb-2">Projects</h1>
        <p className="text-zinc-500 mb-10">Open-source work and experiments</p>
      </motion.div>

      {/* Error banner with retry */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/[0.06] border border-yellow-500/10 text-sm text-yellow-300"
        >
          <span>Showing cached data. Live stats may be unavailable.</span>
          <button onClick={() => window.location.reload()} className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </motion.div>
      )}

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        {[
          { icon: Github, label: 'Repositories', value: displayRepos.length },
          { icon: Star, label: 'Total stars', value: totalStars },
          { icon: GitBranch, label: 'Languages', value: Object.keys(primaryLanguages).length },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-zinc-900/50 border border-white/[0.06] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-zinc-500" />
              <span className="text-xs text-zinc-500">{label}</span>
            </div>
            <p className="text-3xl font-display font-bold font-tabular text-zinc-100">{value}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-1">
          {categories.map(c => (
            <button key={c.id} onClick={() => { setActiveCategory(c.id); setVisibleCount(12); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${activeCategory === c.id ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-zinc-500 hover:text-zinc-300 border border-transparent'}`}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(12); }}
              className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/30 transition-colors" />
          </div>
          <select value={selectedLanguage} onChange={(e) => { setSelectedLanguage(e.target.value); setVisibleCount(12); }}
            className="px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-blue-500/30 transition-colors cursor-pointer">
            <option value="all" className="bg-zinc-900">All</option>
            {topLanguages.map(([lang]) => <option key={lang} value={lang} className="bg-zinc-900">{lang}</option>)}
          </select>
        </div>
      </motion.div>

      <p className="text-xs text-zinc-600 mb-4">{Math.min(visibleCount, filteredRepos.length)} of {filteredRepos.length}</p>

      {/* Grid with GlowCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.slice(0, visibleCount).map((repo, i) => (
          <GlowCard
            key={repo.id || repo.name}
            as="a"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * (i % 12), duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="p-5 h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-zinc-100 group-hover/card:text-blue-400 transition-colors duration-300 truncate pr-2">
                  {repo.name}
                </h3>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover/card:text-blue-400 transition-colors flex-shrink-0" />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
                {repo.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-[11px] text-zinc-600 pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#888' }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" />{repo.forks_count}</span>
                </div>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</span>
              </div>
            </motion.div>
          </GlowCard>
        ))}
      </div>

      {visibleCount < filteredRepos.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisibleCount(prev => prev + 12)}
            className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all duration-300">
            Load more ({filteredRepos.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
} 
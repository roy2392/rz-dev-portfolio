const GITHUB_API_BASE = 'https://api.github.com'
const CACHE_KEY = 'gh_repos_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Curated featured projects (shown if API fails)
export const FEATURED_PROJECTS = [
  { id: 1, name: 'wandb-cicid', description: 'W&B CI/CD integration for ML experiment tracking and model management', language: 'Python', stargazers_count: 5, forks_count: 1, updated_at: '2026-04-01', html_url: 'https://github.com/roy2392/wandb-cicid', topics: ['mlops', 'wandb'] },
  { id: 2, name: 'rz-dev-portfolio', description: 'Personal developer portfolio with AI chat assistant', language: 'JavaScript', stargazers_count: 3, forks_count: 0, updated_at: '2026-05-16', html_url: 'https://github.com/roy2392/rz-dev-portfolio', topics: ['portfolio', 'react'] },
  { id: 3, name: 'ml_portfolio', description: 'Machine learning portfolio showcasing production ML projects', language: 'Python', stargazers_count: 2, forks_count: 0, updated_at: '2026-03-15', html_url: 'https://github.com/roy2392/ml_portfolio', topics: ['machine-learning'] },
]

const getCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp < CACHE_TTL) return data
    return { stale: data } // return stale data as fallback
  } catch { return null }
}

const setCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch { /* quota exceeded — ignore */ }
}

export const fetchUserRepos = async (username) => {
  // Check fresh cache first
  const cached = getCache()
  if (cached && !cached.stale) return cached

  try {
    const allRepos = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&direction=desc&page=${page}`
      )
      
      if (!response.ok) {
        // If rate-limited, try stale cache or fallback
        if (response.status === 403 || response.status === 429) {
          if (cached?.stale) return cached.stale
          throw new Error('GitHub API rate limit exceeded')
        }
        throw new Error(`Failed to fetch repos: ${response.statusText}`)
      }
      
      const data = await response.json()
      allRepos.push(...data)
      hasMore = data.length === 100
      page++
    }

    setCache(allRepos)
    return allRepos
  } catch (error) {
    // On any error, return stale cache if available
    if (cached?.stale) return cached.stale
    console.error('Error fetching repos:', error)
    throw error
  }
} 
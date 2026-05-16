import { useState, useEffect } from 'react'
import { fetchUserRepos } from '../services/github'

export const useGithubRepos = (username, limit = 0) => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalStars, setTotalStars] = useState(0)
  const [primaryLanguages, setPrimaryLanguages] = useState({})

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchUserRepos(username)
        const filteredRepos = data.filter(repo => !repo.fork)
        const displayRepos = limit > 0 ? filteredRepos.slice(0, limit) : filteredRepos
        
        // Calculate total stars across ALL non-fork repos
        const stars = filteredRepos.reduce((total, repo) => total + repo.stargazers_count, 0)
        setTotalStars(stars)
        
        // Calculate primary languages across ALL non-fork repos
        const languages = filteredRepos.reduce((langs, repo) => {
          if (repo.language) {
            langs[repo.language] = (langs[repo.language] || 0) + 1
          }
          return langs
        }, {})
        setPrimaryLanguages(languages)
        
        setRepos(displayRepos)
      } catch (err) {
        console.error('Error fetching repos:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadRepos()
  }, [username, limit])

  return { repos, loading, error, totalStars, primaryLanguages }
} 
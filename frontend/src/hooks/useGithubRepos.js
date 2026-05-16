import { useState, useEffect } from 'react'
import { fetchUserRepos, FEATURED_PROJECTS } from '../services/github'

export const useGithubRepos = (username, limit = 0) => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalStars, setTotalStars] = useState(0)
  const [primaryLanguages, setPrimaryLanguages] = useState({})

  const processRepos = (data) => {
    const filteredRepos = data.filter(repo => !repo.fork)
    const displayRepos = limit > 0 ? filteredRepos.slice(0, limit) : filteredRepos
    
    const stars = filteredRepos.reduce((total, repo) => total + repo.stargazers_count, 0)
    setTotalStars(stars)
    
    const languages = filteredRepos.reduce((langs, repo) => {
      if (repo.language) {
        langs[repo.language] = (langs[repo.language] || 0) + 1
      }
      return langs
    }, {})
    setPrimaryLanguages(languages)
    setRepos(displayRepos)
  }

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchUserRepos(username)
        processRepos(data)
      } catch (err) {
        console.error('Error fetching repos:', err)
        // Use fallback featured projects
        processRepos(FEATURED_PROJECTS)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadRepos()
  }, [username, limit])

  return { repos, loading, error, totalStars, primaryLanguages }
} 
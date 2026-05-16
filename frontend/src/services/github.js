const GITHUB_API_BASE = 'https://api.github.com'

export const fetchUserRepos = async (username) => {
  try {
    const allRepos = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&direction=desc&page=${page}`
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to fetch repos: ${errorData.message || response.statusText}`)
      }
      
      const data = await response.json()
      allRepos.push(...data)
      hasMore = data.length === 100
      page++
    }

    return allRepos
  } catch (error) {
    console.error('Error fetching repos:', error)
    throw error
  }
} 
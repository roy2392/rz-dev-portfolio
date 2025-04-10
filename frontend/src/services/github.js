const GITHUB_API_BASE = 'https://api.github.com'

export const fetchUserRepos = async (username) => {
  try {
    // Get up to 100 repos, sorted by updated time to get the most recent ones
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&direction=desc`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to fetch repos: ${errorData.message || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching repos:', error)
    throw error
  }
} 
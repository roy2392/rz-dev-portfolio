import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { ProjectsSection } from './index';
import React from 'react';
import '../../../test/mocks';
import { useGithubRepos } from '../../../hooks/useGithubRepos';
import { renderWithConfig } from '../../../test/testUtils';

// Mock the useGithubRepos hook
vi.mock('../../../hooks/useGithubRepos', () => ({
  useGithubRepos: vi.fn()
}));

describe('ProjectsSection', () => {
  const mockRepos = [
    {
      id: 1,
      name: 'Test Repo 1',
      description: 'Test description 1',
      html_url: 'https://github.com/roy2392/test-repo-1',
      language: 'JavaScript',
      stargazers_count: 10,
      forks_count: 5,
      watchers_count: 3,
      updated_at: '2023-05-20T12:00:00Z',
      owner: { login: 'roy2392' }
    },
    {
      id: 2,
      name: 'Test Repo 2',
      description: 'Test description 2',
      html_url: 'https://github.com/roy2392/test-repo-2',
      language: 'Python',
      stargazers_count: 15,
      forks_count: 8,
      watchers_count: 4,
      updated_at: '2023-06-15T12:00:00Z',
      owner: { login: 'roy2392' }
    }
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });
  
  it('renders loading state', () => {
    // Mock loading state
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: [],
      loading: true,
      error: null,
      totalStars: 0,
      primaryLanguages: {}
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Check for loading spinner
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.getByText('GitHub Projects')).toBeInTheDocument();
  });
  
  it('renders error state', () => {
    // Mock error state
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: [],
      loading: false,
      error: 'Failed to fetch repositories',
      totalStars: 0,
      primaryLanguages: {}
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Check for error message
    expect(screen.getByText('Error loading projects. Please try again later.')).toBeInTheDocument();
  });
  
  it('renders repositories and stats correctly', () => {
    // Mock repository data with stats
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: mockRepos,
      loading: false,
      error: null,
      totalStars: 25,
      primaryLanguages: {
        JavaScript: 1,
        Python: 1
      }
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Check that repositories are rendered
    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
    
    // Check that stats are rendered
    expect(screen.getByText('2')).toBeInTheDocument(); // Number of repos
    expect(screen.getByText('25')).toBeInTheDocument(); // Total stars
    expect(screen.getByText('JavaScript')).toBeInTheDocument(); // Language tag
    expect(screen.getByText('Python')).toBeInTheDocument(); // Language tag
    
    // Check repository details
    expect(screen.getByText('10')).toBeInTheDocument(); // Star count for repo 1
    expect(screen.getByText('15')).toBeInTheDocument(); // Star count for repo 2
  });
  
  it('filters repositories when category buttons are clicked', () => {
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: mockRepos,
      loading: false,
      error: null,
      totalStars: 25,
      primaryLanguages: {
        JavaScript: 1,
        Python: 1
      }
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Get category buttons
    const allButton = screen.getByText('All Projects');
    const recentButton = screen.getByText('Recently Updated');
    const popularButton = screen.getByText('Most Popular');
    
    // Click on Popular button
    fireEvent.click(popularButton);
    
    // Check that the popular button is active (has purple background)
    expect(popularButton.className).toContain('bg-purple-500');
    
    // Click on Recent button
    fireEvent.click(recentButton);
    
    // Check that the recent button is active
    expect(recentButton.className).toContain('bg-purple-500');
    expect(popularButton.className).not.toContain('bg-purple-500');
  });
  
  it('calls useGithubRepos with correct parameters', () => {
    // Mock repositories
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: mockRepos,
      loading: false,
      error: null,
      totalStars: 25,
      primaryLanguages: {}
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Check that useGithubRepos was called with correct parameters
    expect(useGithubRepos).toHaveBeenCalledWith('roy2392', 15);
  });
  
  it('renders repositories with missing descriptions', () => {
    // Mock repositories with missing descriptions
    const reposWithMissingDesc = [
      {
        id: 1,
        name: 'Test Repo 1',
        description: null,
        html_url: 'https://github.com/roy2392/test-repo-1',
        language: 'JavaScript',
        stargazers_count: 10,
        forks_count: 5,
        watchers_count: 3,
        updated_at: '2023-05-20T12:00:00Z',
        owner: { login: 'roy2392' }
      }
    ];
    
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: reposWithMissingDesc,
      loading: false,
      error: null,
      totalStars: 10,
      primaryLanguages: { JavaScript: 1 }
    });
    
    renderWithConfig(<ProjectsSection />);
    
    // Check that fallback description is used
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });
}); 
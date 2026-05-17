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

// Mock the GlowCard component
vi.mock('../../ui/GlowCard', () => ({
  GlowCard: ({ children, as: Tag = 'div', ...props }) =>
    React.createElement(Tag || 'div', props, children)
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Github: (props) => <span data-testid="github-icon" {...props} />,
  Star: (props) => <span data-testid="star-icon" {...props} />,
  GitBranch: (props) => <span data-testid="gitbranch-icon" {...props} />,
  Clock: (props) => <span data-testid="clock-icon" {...props} />,
  Search: (props) => <span data-testid="search-icon" {...props} />,
  ArrowUpRight: (props) => <span data-testid="arrowupright-icon" {...props} />,
  RefreshCw: (props) => <span data-testid="refresh-icon" {...props} />,
}));

// Mock the github service for FEATURED_PROJECTS
vi.mock('../../../services/github', () => ({
  FEATURED_PROJECTS: []
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
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: [],
      loading: true,
      error: null,
      totalStars: 0,
      primaryLanguages: {}
    });

    renderWithConfig(<ProjectsSection />);

    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders error banner with cached data fallback', () => {
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: mockRepos,
      loading: false,
      error: 'Failed to fetch repositories',
      totalStars: 0,
      primaryLanguages: {}
    });

    renderWithConfig(<ProjectsSection />);

    expect(screen.getByText(/Showing cached data/)).toBeInTheDocument();
  });

  it('renders repositories and stats correctly', () => {
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

    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
    expect(screen.getByText('Repositories')).toBeInTheDocument();
    expect(screen.getByText('Total stars')).toBeInTheDocument();
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

    const allButton = screen.getByRole('button', { name: 'All' });
    const recentButton = screen.getByRole('button', { name: 'Recent' });
    const popularButton = screen.getByRole('button', { name: 'Popular' });

    fireEvent.click(popularButton);
    expect(popularButton.className).toContain('bg-blue-500/10');

    fireEvent.click(recentButton);
    expect(recentButton.className).toContain('bg-blue-500/10');
  });

  it('calls useGithubRepos with correct parameters', () => {
    vi.mocked(useGithubRepos).mockReturnValue({
      repos: mockRepos,
      loading: false,
      error: null,
      totalStars: 25,
      primaryLanguages: {}
    });

    renderWithConfig(<ProjectsSection />);

    expect(useGithubRepos).toHaveBeenCalledWith('roy2392');
  });

  it('renders repositories with missing descriptions', () => {
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

    expect(screen.getByText('No description')).toBeInTheDocument();
  });
}); 
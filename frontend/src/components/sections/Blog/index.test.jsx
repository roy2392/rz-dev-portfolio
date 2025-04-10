import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { BlogSection } from './index';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock setTimeout
vi.useFakeTimers();

describe('BlogSection', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });
  
  it('renders blog section with title', () => {
    renderWithConfig(<BlogSection />);
    
    // Check for the title
    expect(screen.getByText('Blog Articles')).toBeInTheDocument();
  });
  
  it('shows loading state initially', () => {
    renderWithConfig(<BlogSection />);
    
    // Should show loading animation initially
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
  
  it('shows articles after loading completes', async () => {
    renderWithConfig(<BlogSection />);
    
    // Fast-forward timer to complete loading
    vi.advanceTimersByTime(1000);
    
    // Should show article titles after loading
    await waitFor(() => {
      expect(screen.getByText('Understanding Fine-Tuning in Large Language Models')).toBeInTheDocument();
      expect(screen.getByText('Building RAG Applications with Python and Vector Databases')).toBeInTheDocument();
    });
  });
  
  it('provides correct links to articles', async () => {
    renderWithConfig(<BlogSection />);
    
    // Fast-forward timer to complete loading
    vi.advanceTimersByTime(1000);
    
    // Check article links
    await waitFor(() => {
      const articleLinks = screen.getAllByText('Read Article');
      expect(articleLinks[0].closest('a')).toHaveAttribute('href', expect.stringContaining('medium.com/@roeyzalta'));
    });
  });
  
  it('provides link to Medium profile', () => {
    renderWithConfig(<BlogSection />);
    
    // Check for the link to Medium profile
    const link = screen.getByText('View all articles on Medium').closest('a');
    expect(link).toHaveAttribute('href', 'https://medium.com/@roeyzalta');
  });
}); 
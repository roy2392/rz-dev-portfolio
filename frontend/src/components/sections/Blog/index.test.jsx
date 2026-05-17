import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { BlogSection } from './index';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowUpRight: (props) => <span data-testid="arrow-icon" {...props} />,
  Clock: (props) => <span data-testid="clock-icon" {...props} />,
}));

describe('BlogSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders blog section with title', () => {
    renderWithConfig(<BlogSection />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders the featured article', () => {
    renderWithConfig(<BlogSection />);
    expect(screen.getByText('Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything')).toBeInTheDocument();
  });

  it('shows articles after loading completes', () => {
    renderWithConfig(<BlogSection />);
    expect(screen.getByText('Claude Managed Agents + Azure: The Multi-Cloud AI Strategy')).toBeInTheDocument();
    expect(screen.getByText('Claude Managed Agents: Deploy Your First Production Agent')).toBeInTheDocument();
  });

  it('provides correct links to articles', () => {
    renderWithConfig(<BlogSection />);
    const featuredLink = screen.getByText('Sub-Agents vs Agent Teams: The Architecture Decision That Changes Everything').closest('a');
    expect(featuredLink).toHaveAttribute('href', expect.stringContaining('medium.com/@roeyzalta'));
  });

  it('provides link to Medium profile', () => {
    renderWithConfig(<BlogSection />);
    const link = screen.getByText('All articles on Medium').closest('a');
    expect(link).toHaveAttribute('href', 'https://medium.com/@roeyzalta');
  });
}); 
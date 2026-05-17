import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { DesktopNav } from './DesktopNav';
import React from 'react';
import '../../../test/mocks';
import { renderWithRouterAndConfig } from '../../../test/testUtils';

// Mock react-router-dom with useLocation
vi.mock('react-router-dom', () => ({
  NavLink: ({ to, children, className }) => (
    <a href={to} className={typeof className === 'function' ? className({ isActive: false }) : className}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: '/', hash: '' }),
}));

describe('DesktopNav', () => {
  beforeEach(() => {
    renderWithRouterAndConfig(<DesktopNav />);
  });

  it('renders all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('AI Chat')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('href', '/#about');
    
    const projectsLink = screen.getByText('Projects').closest('a');
    expect(projectsLink).toHaveAttribute('href', '/#projects');
  });

  it('applies correct styling classes to links', () => {
    const link = screen.getByText('About');
    expect(link.className).toContain('text-[13px]');
    expect(link.className).toContain('text-zinc-400');
  });
}); 
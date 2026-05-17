import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { NavBar } from './index';
import React from 'react';
import '../../../test/mocks';
import { renderWithRouterAndConfig } from '../../../test/testUtils';

// Mock the child components
vi.mock('./DesktopNav', () => ({
  DesktopNav: () => <div data-testid="desktop-nav-mock">Desktop Nav Mock</div>
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, className }) => (
    <a href={to} className={className} data-testid="router-link">
      {children}
    </a>
  )
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Terminal: () => <div data-testid="terminal-icon">Terminal Icon</div>,
}));

describe('NavBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo and site name', () => {
    renderWithRouterAndConfig(<NavBar />);
    
    expect(screen.getByTestId('terminal-icon')).toBeInTheDocument();
    expect(screen.getByText('roey.dev')).toBeInTheDocument();
  });
  
  it('renders the desktop navigation', () => {
    renderWithRouterAndConfig(<NavBar />);
    
    expect(screen.getByTestId('desktop-nav-mock')).toBeInTheDocument();
  });
  
  it('does not render mobile navigation or hamburger menu', () => {
    renderWithRouterAndConfig(<NavBar />);
    
    expect(screen.queryByTestId('mobile-nav-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
  });
  
  it('has a link to the home page', () => {
    renderWithRouterAndConfig(<NavBar />);
    
    const homeLink = screen.getByTestId('router-link');
    expect(homeLink).toHaveAttribute('href', '/');
  });
}); 
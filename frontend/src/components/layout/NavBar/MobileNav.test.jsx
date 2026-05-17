import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { MobileNav } from './MobileNav';
import React from 'react';
import '../../../test/mocks';
import { renderWithRouterAndConfig } from '../../../test/testUtils';

// Mock react-router-dom with useLocation
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/', hash: '' }),
}));

describe('MobileNav', () => {
  let setIsMenuOpen;

  beforeEach(() => {
    setIsMenuOpen = vi.fn();
  });

  it('renders nothing when isMenuOpen is false', () => {
    renderWithRouterAndConfig(<MobileNav isMenuOpen={false} setIsMenuOpen={setIsMenuOpen} />);
    expect(screen.queryByText('About')).not.toBeInTheDocument();
  });

  it('renders navigation links when isMenuOpen is true', () => {
    renderWithRouterAndConfig(<MobileNav isMenuOpen={true} setIsMenuOpen={setIsMenuOpen} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders links with correct href attributes when open', () => {
    renderWithRouterAndConfig(<MobileNav isMenuOpen={true} setIsMenuOpen={setIsMenuOpen} />);
    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('href', '/#about');
  });

  it('applies correct styling classes to links', () => {
    renderWithRouterAndConfig(<MobileNav isMenuOpen={true} setIsMenuOpen={setIsMenuOpen} />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink.className).toContain('text-zinc-400');
  });

  it('calls setIsMenuOpen(false) when a navigation link is clicked', () => {
    renderWithRouterAndConfig(<MobileNav isMenuOpen={true} setIsMenuOpen={setIsMenuOpen} />);
    fireEvent.click(screen.getByText('Projects'));
    expect(setIsMenuOpen).toHaveBeenCalledWith(false);
  });
}); 
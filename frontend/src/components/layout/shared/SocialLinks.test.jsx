import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock the getSocialLinksWithIcons and navConfig
vi.mock('../config/navigationConfig', () => {
  const mockSocialLinks = [
    { 
      href: "https://github.com/user", 
      icon: vi.fn(() => <div data-testid="github-icon">GitHub Icon</div>), 
      label: "GitHub",
      color: "hover:text-[#2DA44E]"
    },
    { 
      href: "https://linkedin.com/in/user", 
      icon: vi.fn(() => <div data-testid="linkedin-icon">LinkedIn Icon</div>), 
      label: "LinkedIn",
      color: "hover:text-[#0A66C2]"
    },
    { 
      href: "mailto:user@gmail.com", 
      icon: vi.fn(() => <div data-testid="email-icon">Email Icon</div>), 
      label: "Email",
      color: "hover:text-[#00C8DC]"
    }
  ];

  return {
    getSocialLinksWithIcons: vi.fn(() => mockSocialLinks),
    navConfig: {
      iconAnimation: {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 }
      }
    }
  };
});

// Mock React's useEffect to execute immediately
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: (callback) => callback(),
  };
});

describe('SocialLinks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all social links', () => {
    renderWithConfig(<SocialLinks />);
    
    // Check that all social links are rendered
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
  });
  
  it('renders links with correct href attributes', () => {
    renderWithConfig(<SocialLinks />);
    
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Check that the links have the correct href attributes
    expect(links[0]).toHaveAttribute('href', 'https://github.com/user');
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/user');
    expect(links[2]).toHaveAttribute('href', 'mailto:user@gmail.com');
  });
  
  it('renders links with correct target and rel attributes', () => {
    renderWithConfig(<SocialLinks />);
    
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Check that the links have the correct target and rel attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
  
  it('renders links with correct title attributes', () => {
    renderWithConfig(<SocialLinks />);
    
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Check that the links have the correct title attributes
    expect(links[0]).toHaveAttribute('title', 'GitHub');
    expect(links[1]).toHaveAttribute('title', 'LinkedIn');
    expect(links[2]).toHaveAttribute('title', 'Email');
  });
  
  it('does not show labels (always desktop mode)', () => {
    renderWithConfig(<SocialLinks />);
    
    // Labels should not be visible
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.queryByText('LinkedIn')).not.toBeInTheDocument();
    expect(screen.queryByText('Email')).not.toBeInTheDocument();
  });
  
  it('applies desktop styling with gap-2', () => {
    const { container: desktopContainer } = renderWithConfig(<SocialLinks />);
    
    const desktopDiv = desktopContainer.firstChild;
    expect(desktopDiv).toHaveClass('gap-2');
    expect(desktopDiv).not.toHaveClass('justify-around');
    expect(desktopDiv).not.toHaveClass('w-full');
  });
  
  it('has click handlers that stop event propagation', () => {
    // Mock the implementation of e.stopPropagation
    const originalStopPropagation = Event.prototype.stopPropagation;
    const mockStopPropagation = vi.fn();
    Event.prototype.stopPropagation = mockStopPropagation;
    
    renderWithConfig(<SocialLinks />);
    
    // Get all links
    const links = screen.getAllByRole('link');
    
    // Simulate a click on the first link
    fireEvent.click(links[0]);
    
    // Check that stopPropagation was called
    expect(mockStopPropagation).toHaveBeenCalled();
    
    // Restore the original implementation
    Event.prototype.stopPropagation = originalStopPropagation;
  });
}); 
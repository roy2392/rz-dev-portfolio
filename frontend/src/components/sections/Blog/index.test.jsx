import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, act } from '@testing-library/react';
import { BlogSection } from './index';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock document methods
document.createElement = vi.fn().mockImplementation(() => ({
  src: '',
  async: false,
  onload: vi.fn()
}));

document.body.appendChild = vi.fn();
document.body.removeChild = vi.fn();

// Mock Medium widget
global.MediumWidget = {
  Init: vi.fn()
};

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
    
    // Check for loading message
    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
  });
  
  it('creates and appends script element for Medium widget', () => {
    renderWithConfig(<BlogSection />);
    
    // Check if document.createElement was called with 'script'
    expect(document.createElement).toHaveBeenCalledWith('script');
    
    // Check if document.body.appendChild was called
    expect(document.body.appendChild).toHaveBeenCalled();
  });
  
  it('initializes Medium widget when script loads', () => {
    renderWithConfig(<BlogSection />);
    
    // Get the script element that was created
    const script = document.createElement.mock.results[0].value;
    
    // Trigger script onload
    act(() => {
      script.onload();
    });
    
    // Check if MediumWidget.Init was called
    expect(global.MediumWidget.Init).toHaveBeenCalled();
    
    // Check if it was called with correct parameters
    const initCall = global.MediumWidget.Init.mock.calls[0][0];
    expect(initCall.params.resource).toBe('@roeyzalta');
  });
  
  it('provides link to Medium profile', () => {
    renderWithConfig(<BlogSection />);
    
    // Check for the link to Medium profile
    const link = screen.getByText('View all articles on Medium').closest('a');
    expect(link).toHaveAttribute('href', 'https://medium.com/@roeyzalta');
  });
}); 
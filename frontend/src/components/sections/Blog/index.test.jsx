import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { BlogSection } from './index';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock the fetch function
global.fetch = vi.fn();
global.DOMParser = vi.fn(() => ({
  parseFromString: vi.fn(() => ({
    querySelectorAll: vi.fn(() => [])
  }))
}));

describe('BlogSection', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });
  
  it('renders loading state initially', () => {
    // Mock fetch to return a pending promise
    global.fetch.mockReturnValue(new Promise(() => {}));
    
    renderWithConfig(<BlogSection />);
    
    // Check for loading message
    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
  });
  
  it('renders error state when fetch fails', async () => {
    // Mock fetch to throw an error
    global.fetch.mockRejectedValue(new Error('Network error'));
    
    renderWithConfig(<BlogSection />);
    
    // Wait for the error state to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to load articles')).toBeInTheDocument();
    });
  });
  
  it('renders articles when fetch succeeds', async () => {
    // Mock successful fetch response with sample article data
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        contents: `
          <rss>
            <channel>
              <item>
                <title>Test Article 1</title>
                <link>https://medium.com/@roeyzalta/test-article-1</link>
                <guid>https://medium.com/@roeyzalta/test-article-1</guid>
                <pubDate>Wed, 15 Jun 2023 12:00:00 GMT</pubDate>
                <description>This is a test article description.</description>
                <content:encoded><![CDATA[<img src="https://example.com/image.jpg" />Test content]]></content:encoded>
              </item>
            </channel>
          </rss>
        `
      })
    };
    
    global.fetch.mockResolvedValue(mockResponse);
    
    // Mock DOMParser
    const mockItems = [{
      querySelector: (selector) => {
        switch (selector) {
          case 'guid':
            return { textContent: 'https://medium.com/@roeyzalta/test-article-1' };
          case 'title':
            return { textContent: 'Test Article 1' };
          case 'link':
            return { textContent: 'https://medium.com/@roeyzalta/test-article-1' };
          case 'pubDate':
            return { textContent: 'Wed, 15 Jun 2023 12:00:00 GMT' };
          case 'description':
            return { textContent: 'This is a test article description.' };
          case 'content\\:encoded':
            return { textContent: '<img src="https://example.com/image.jpg" />Test content' };
          default:
            return null;
        }
      }
    }];
    
    const mockDOMParser = {
      parseFromString: vi.fn().mockReturnValue({
        querySelectorAll: vi.fn().mockReturnValue(mockItems)
      })
    };
    
    global.DOMParser = vi.fn(() => mockDOMParser);
    
    renderWithConfig(<BlogSection />);
    
    // Wait for articles to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText(/This is a test article description/)).toBeInTheDocument();
      expect(screen.getByText('Read Article')).toBeInTheDocument();
    });
  });
}); 
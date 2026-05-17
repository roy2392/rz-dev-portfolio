import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUserRepos } from './github';

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: vi.fn((key) => localStorageMock.store[key] || null),
  setItem: vi.fn((key, value) => { localStorageMock.store[key] = value; }),
  clear: vi.fn(() => { localStorageMock.store = {}; }),
  removeItem: vi.fn((key) => { delete localStorageMock.store[key]; }),
};

describe('GitHub Service', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
    localStorageMock.store = {};
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  describe('fetchUserRepos', () => {
    it('should fetch repos from the GitHub API with correct URL', async () => {
      const mockRepos = [
        { id: 1, name: 'repo1' },
        { id: 2, name: 'repo2' }
      ];

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockRepos)
      };

      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchUserRepos('testuser');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.github.com/users/testuser/repos')
      );
      expect(result).toEqual(mockRepos);
    });

    it('should throw an error when the response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found'
      };

      global.fetch.mockResolvedValue(mockResponse);

      await expect(fetchUserRepos('nonexistentuser')).rejects.toThrow('Failed to fetch repos');
    });

    it('should throw an error when fetch fails', async () => {
      const networkError = new Error('Network error');
      global.fetch.mockRejectedValue(networkError);

      await expect(fetchUserRepos('testuser')).rejects.toThrow('Network error');
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue([])
      };

      global.fetch.mockResolvedValue(mockResponse);

      const result = await fetchUserRepos('emptyuser');

      expect(result).toEqual([]);
    });
  });
}); 
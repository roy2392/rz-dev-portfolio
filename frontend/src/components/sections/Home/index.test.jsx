import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import '../../../test/mocks'
import { renderWithConfig } from '../../../test/testUtils'
import { HomeSection } from './index'

vi.mock('./ChatBox', () => ({
  ChatBox: () => <div data-testid="chat-box">Chat Box</div>,
}))

vi.mock('../../../hooks/useGithubRepos', () => ({
  useGithubRepos: () => ({
    repos: [
      {
        id: 1,
        name: 'portfolio-app',
        html_url: 'https://github.com/roy2392/portfolio-app',
        description: 'Portfolio project',
        language: 'JavaScript',
        stargazers_count: 10,
        forks_count: 2,
      },
    ],
    totalStars: 42,
  }),
}))

const useIsMobileMock = vi.fn(() => false)
vi.mock('../../../hooks/useIsMobile', () => ({
  useIsMobile: (...args) => useIsMobileMock(...args),
}))

describe('HomeSection', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    window.sessionStorage.setItem('mac-booted', 'true')
    useIsMobileMock.mockReturnValue(false)
  })

  it('renders the desktop widgets when not on mobile', () => {
    renderWithConfig(<HomeSection />)

    expect(screen.getByText('Roey Zalta')).toBeInTheDocument()
    expect(screen.getByText('ML Engineer & AI Architect')).toBeInTheDocument()
    expect(screen.getByText('42 stars')).toBeInTheDocument()
  })

  it('renders the mobile card layout and opens chat sheet', () => {
    useIsMobileMock.mockReturnValue(true)

    renderWithConfig(<HomeSection />)

    expect(screen.getByText('macOS portfolio')).toBeInTheDocument()
    expect(screen.getByText('Expertise')).toBeInTheDocument()
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Blog').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: /chat/i }))

    expect(screen.getByText("Chat with Roey's AI")).toBeInTheDocument()
    expect(screen.getByTestId('chat-box')).toBeInTheDocument()
  })
})

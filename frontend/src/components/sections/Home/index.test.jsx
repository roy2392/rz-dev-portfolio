import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
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

describe('HomeSection', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    window.sessionStorage.setItem('mac-booted', 'true')
  })

  it('renders the desktop Mac-style widgets', () => {
    renderWithConfig(<HomeSection />)

    expect(screen.getByText('Roey Zalta')).toBeInTheDocument()
    expect(screen.getByText('ML Engineer & AI Architect')).toBeInTheDocument()
    expect(screen.getByText('42 stars')).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { TypingIndicator } from './TypingIndicator';
import React from 'react';
import '../../../test/mocks';
import { renderWithConfig } from '../../../test/testUtils';

// Mock the Lucide React icons
vi.mock('lucide-react', () => ({
  Bot: (props) => React.createElement('div', { 'data-testid': 'bot-icon', ...props })
}));

describe('TypingIndicator', () => {
  it('renders the full typing indicator with avatar when inline=false', () => {
    renderWithConfig(<TypingIndicator />);

    expect(screen.getByTestId('ai-typing-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('bot-icon')).toBeInTheDocument();
  });

  it('renders just the dots when inline=true', () => {
    renderWithConfig(<TypingIndicator inline />);

    expect(screen.getByTestId('typing-indicator-inline')).toBeInTheDocument();
    expect(screen.queryByTestId('bot-icon')).not.toBeInTheDocument();
  });

  it('renders three animation dots in non-inline mode', () => {
    const { container } = renderWithConfig(<TypingIndicator />);

    // The dots are motion.div elements rendered as plain divs by the mock
    const dotsContainer = container.querySelector('[data-testid="ai-typing-indicator"]');
    expect(dotsContainer).toBeInTheDocument();
    // Verify the component has the bg-white/40 dots
    const dots = container.querySelectorAll('.bg-white\\/40');
    expect(dots.length).toBe(3);
  });
}); 
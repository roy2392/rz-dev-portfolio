import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import React from 'react';
import '../../test/mocks';
import { renderWithConfig } from '../../test/testUtils';

// Mock the MenuBar component
vi.mock('../mac/MenuBar', () => ({
  MenuBar: () => <div data-testid="menubar-mock">MenuBar Mock</div>
}));

describe('MainLayout', () => {
  it('renders the MenuBar component', () => {
    renderWithConfig(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('menubar-mock')).toBeInTheDocument();
  });

  it('renders the children content', () => {
    renderWithConfig(
      <MainLayout>
        <div data-testid="test-content">Test Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    renderWithConfig(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    const mainContainer = screen.getByText('Test Content').closest('.h-screen');
    expect(mainContainer).toHaveClass('h-screen');
    expect(mainContainer).toHaveClass('w-screen');
    expect(mainContainer).toHaveClass('overflow-hidden');
  });
}); 
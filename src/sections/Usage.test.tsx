import { render, screen } from '@testing-library/react';
import { Usage } from './Usage';
import { describe, it, expect } from 'vitest';

describe('Usage Component', () => {
  it('renders key bindings by default', () => {
    render(<Usage />);

    // Check for section headers (h3 are usually what they are)
    // Using getAllByText because "Navigation" might appear in the tab trigger too,
    // but looking at the code, tab triggers have the same text.
    // However, getByText throws if multiple found, so I'll check that.
    // The code has "Navigation" in keyBindings array (category) and "Navigation" in h3.
    // Wait, the code:
    // { key: '...', ..., category: 'Navigation' }
    // <h3 ...>Navigation</h3>
    // The category string itself is not rendered for each item, but used for filtering.
    // So "Navigation" appears in:
    // 1. The H3 header.
    // 2. The Key object? No, the category field is not rendered in the loop.
    // But wait, there are tabs triggers? No, tabs triggers are "Key Bindings", "Command Line", etc.
    // "Navigation" is only in the H3.
    // Let's verify `Usage.tsx` content again mentally.
    // <h3 className="...">Navigation</h3>
    // {keyBindings.filter(k => k.category === 'Navigation')...}

    // So getByText('Navigation') should work if it's unique.

    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();

    // Check for some specific bindings
    expect(screen.getByText('h/j/k/l')).toBeInTheDocument();
    expect(screen.getByText('Navigate (Vim-style)')).toBeInTheDocument();

    expect(screen.getByText('s')).toBeInTheDocument(); // SSH Shell
    expect(screen.getByText('SSH Shell')).toBeInTheDocument();

    expect(screen.getByText('q')).toBeInTheDocument();
    expect(screen.getByText('Quit')).toBeInTheDocument();
  });
});

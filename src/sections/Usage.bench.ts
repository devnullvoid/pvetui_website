/* eslint-disable @typescript-eslint/no-unused-vars */
import { bench, describe } from 'vitest';

const keyBindings = [
  { key: 'h/j/k/l', action: 'Navigate (Vim-style)', category: 'Navigation' },
  { key: '↑↓←→', action: 'Arrow key navigation', category: 'Navigation' },
  { key: 'Enter', action: 'Select/Confirm', category: 'Navigation' },
  { key: 'Alt+1/2/3', action: 'Switch views', category: 'Navigation' },
  { key: '[]', action: 'Previous/Next view', category: 'Navigation' },
  { key: '/', action: 'Search', category: 'Actions' },
  { key: 's', action: 'SSH Shell', category: 'Actions' },
  { key: 'v', action: 'VNC Console', category: 'Actions' },
  { key: 'm', action: 'Context Menu', category: 'Actions' },
  { key: 'g', action: 'Global Menu', category: 'Actions' },
  { key: 'a', action: 'Auto-refresh', category: 'Actions' },
  { key: '?', action: 'Help', category: 'System' },
  { key: 'q', action: 'Quit', category: 'System' },
  { key: 'Ctrl+C', action: 'Cancel/Exit', category: 'System' },
];

// Simulate the proposed structure
const preGrouped = {
  Navigation: keyBindings.filter(k => k.category === 'Navigation'),
  Actions: keyBindings.filter(k => k.category === 'Actions'),
  System: keyBindings.filter(k => k.category === 'System'),
};

describe('Usage Component Filtering Logic', () => {
  bench('Current: Filter on every render', () => {
    const _nav = keyBindings.filter(k => k.category === 'Navigation');
    const _act = keyBindings.filter(k => k.category === 'Actions');
    const _sys = keyBindings.filter(k => k.category === 'System');
    void _nav;
    void _act;
    void _sys;
  });

  bench('Proposed: Pre-grouped access', () => {
    const _nav = preGrouped.Navigation;
    const _act = preGrouped.Actions;
    const _sys = preGrouped.System;
    void _nav;
    void _act;
    void _sys;
  });
});

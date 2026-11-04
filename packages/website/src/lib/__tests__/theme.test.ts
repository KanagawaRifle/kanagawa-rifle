import { afterEach, describe, expect, it, vi } from 'vitest';

import { applyTheme, readTheme } from '../theme';

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.removeAttribute('class');
  document.documentElement.removeAttribute('style');
});

describe('document theme', () => {
  it('uses the saved choice and keeps other root classes', () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.className = 'other light';
    applyTheme(readTheme());
    expect(document.documentElement.className).toBe('other dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
    applyTheme('light');
    expect(document.documentElement.className).toBe('other light');
    expect(document.documentElement.style.colorScheme).toBe('light');
  });

  it.each([null, 'system', 'unknown'])('resolves %s against the system preference', (theme) => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    vi.spyOn(window, 'matchMedia').mockReturnValue({ ...query, matches: true });
    applyTheme(theme);
    expect(document.documentElement).toHaveClass('dark');
    vi.spyOn(window, 'matchMedia').mockReturnValue({ ...query, matches: false });
    applyTheme(theme);
    expect(document.documentElement).toHaveClass('light');
  });

  it('falls back to the system preference when storage is inaccessible', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is blocked', 'SecurityError');
    });
    expect(readTheme()).toBeNull();
    applyTheme(readTheme());
    expect(document.documentElement).toHaveClass('light');
  });
});

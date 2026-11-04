import { runInNewContext } from 'node:vm';

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { ThemeScript } from '../ThemeScript';

afterEach(() => {
  document.documentElement.removeAttribute('class');
  document.documentElement.removeAttribute('style');
});

describe('theme bootstrap without framework JavaScript', () => {
  it.each([
    ['dark', false, 'dark'],
    ['light', true, 'light'],
    [null, true, 'dark'],
    ['system', false, 'light'],
  ])('applies saved theme %s with system dark mode %s', (storedTheme, systemDark, expectedTheme) => {
    const { container } = render(<ThemeScript />);
    const script = container.querySelector('script')?.textContent;
    expect(script).toBeTruthy();
    // An isolated context catches accidental references to module-local helpers
    // that would be missing when the serialized script runs in the document head.
    runInNewContext(script!, {
      document,
      localStorage: { getItem: () => storedTheme },
      window: { matchMedia: () => ({ matches: systemDark }) },
    });
    expect(document.documentElement).toHaveClass(expectedTheme);
    expect(document.documentElement.style.colorScheme).toBe(expectedTheme);
  });

  it('uses the system preference when storage access throws', () => {
    const { container } = render(<ThemeScript />);
    runInNewContext(container.querySelector('script')!.textContent!, {
      document,
      localStorage: {
        getItem() {
          throw new Error('Storage is unavailable');
        },
      },
      window: { matchMedia: () => ({ matches: true }) },
    });
    expect(document.documentElement).toHaveClass('dark');
  });
});

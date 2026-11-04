// packages/website/src/components/ThemeToggle.tsx

'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { buttonVariants } from '@/components/ui/button-styles';
import { applyTheme, readTheme } from '@/lib/theme';

export function ThemeToggle() {
  const selectedTheme = useRef<string | null>(null);

  useEffect(() => {
    selectedTheme.current = readTheme();
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      if (selectedTheme.current !== 'light' && selectedTheme.current !== 'dark') {
        applyTheme(selectedTheme.current);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'theme' || event.key === null) {
        selectedTheme.current = event.newValue;
        applyTheme(event.newValue);
      }
    };
    query.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    return () => {
      query.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggleTheme = () => {
    const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    selectedTheme.current = theme;
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The selected theme still works when browser storage is unavailable.
    }
  };

  // CSS follows the pre-paint theme class without a separate hydration-state update.
  return (
    <button
      type="button"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      onClick={toggleTheme}
      title="テーマを切り替え"
    >
      <Moon className="h-5 w-5 dark:hidden" />
      <span className="sr-only dark:hidden">ダークモードに切り替え</span>
      <Sun className="hidden h-5 w-5 dark:block" />
      <span className="sr-only hidden dark:block">ライトモードに切り替え</span>
    </button>
  );
}

'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function NavigationTabs({ items }: { items: Array<{ name: string; href: string }> }) {
  const pathname = usePathname() ?? '/';
  const matchedPath = items.find((obj) => pathname === obj.href || pathname.startsWith(`${obj.href}/`))?.href;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Native links remain usable during SSR. Only visible desktop navigation
  // needs Next.js link observers and automatic prefetching.
  const NavigationLink = isDesktop ? Link : 'a';

  return (
    <nav className="hidden flex-grow md:flex" aria-label="メインナビゲーション">
      <ul className="flex w-full">
        {items.map((obj) => {
          const isActive = obj.href === matchedPath;
          return (
            <li key={obj.href} className="flex-1">
              <NavigationLink
                href={obj.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'block border-b-2 px-4 py-3 text-center text-sm font-bold whitespace-nowrap uppercase transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'text-muted-foreground hover:text-primary border-transparent',
                )}
              >
                {obj.name}
              </NavigationLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

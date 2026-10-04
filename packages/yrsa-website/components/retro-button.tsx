import Link from 'next/link';

import { cn } from '@/lib/utils';

type ColorVariant = 'orange' | 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'cyan';

const colorVariants: Record<ColorVariant, { gradient: string; hover: string }> = {
  orange: {
    gradient: 'from-orange-300 to-orange-500',
    hover: 'hover:from-orange-400 hover:to-orange-600',
  },
  green: {
    gradient: 'from-green-300 to-green-500',
    hover: 'hover:from-green-400 hover:to-green-600',
  },
  blue: {
    gradient: 'from-blue-300 to-blue-500',
    hover: 'hover:from-blue-400 hover:to-blue-600',
  },
  purple: {
    gradient: 'from-purple-300 to-purple-500',
    hover: 'hover:from-purple-400 hover:to-purple-600',
  },
  pink: {
    gradient: 'from-pink-300 to-pink-500',
    hover: 'hover:from-pink-400 hover:to-pink-600',
  },
  yellow: {
    gradient: 'from-yellow-300 to-yellow-500',
    hover: 'hover:from-yellow-400 hover:to-yellow-600',
  },
  cyan: {
    gradient: 'from-cyan-300 to-cyan-500',
    hover: 'hover:from-cyan-400 hover:to-cyan-600',
  },
};

interface RetroButtonProps {
  href?: string;
  children: React.ReactNode;
  color?: ColorVariant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * 2000年代風グラデーションボタン
 *
 * @example
 * <RetroButton href="/about" color="green">詳細を見る</RetroButton>
 * <RetroButton color="blue" onClick={handleClick}>クリック</RetroButton>
 */
export function RetroButton({
  href,
  children,
  color = 'blue',
  external = false,
  className,
  onClick,
  type = 'button',
}: RetroButtonProps) {
  const variant = colorVariants[color];

  const buttonClasses = cn(
    'font-retro inline-block rounded bg-gradient-to-b px-4 py-2 font-bold text-white shadow text-shadow-sm',
    'transition-all motion-safe:hover:scale-105',
    'focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:outline-none',
    variant.gradient,
    variant.hover,
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
          {children}
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}

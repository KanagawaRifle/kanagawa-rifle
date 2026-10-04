import { cn } from '@/lib/utils';

type ColorVariant = 'blue' | 'green' | 'pink' | 'orange' | 'cyan' | 'lime' | 'purple' | 'yellow';

const colorVariants: Record<ColorVariant, { border: string; bg: string; header: string }> = {
  blue: {
    border: 'border-blue-400',
    bg: 'bg-blue-50',
    header: 'from-blue-400 to-blue-600',
  },
  green: {
    border: 'border-green-400',
    bg: 'bg-green-50',
    header: 'from-green-400 to-green-600',
  },
  pink: {
    border: 'border-pink-400',
    bg: 'bg-pink-50',
    header: 'from-pink-400 to-pink-600',
  },
  orange: {
    border: 'border-orange-400',
    bg: 'bg-orange-50',
    header: 'from-orange-400 to-orange-600',
  },
  cyan: {
    border: 'border-cyan-400',
    bg: 'bg-cyan-50',
    header: 'from-cyan-400 to-cyan-600',
  },
  lime: {
    border: 'border-lime-400',
    bg: 'bg-lime-50',
    header: 'from-lime-400 to-lime-600',
  },
  purple: {
    border: 'border-purple-400',
    bg: 'bg-purple-50',
    header: 'from-purple-400 to-purple-600',
  },
  yellow: {
    border: 'border-yellow-400',
    bg: 'bg-yellow-50',
    header: 'from-yellow-400 to-yellow-600',
  },
};

interface RetroCardProps {
  title: string;
  color?: ColorVariant;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

/**
 * 2000年代風レトロカードコンポーネント
 *
 * @example
 * <RetroCard title="お知らせ" color="blue">
 *   <p>コンテンツ</p>
 * </RetroCard>
 */
export function RetroCard({ title, color = 'blue', children, className, as: Component = 'div' }: RetroCardProps) {
  const variant = colorVariants[color];

  return (
    <Component className={cn('border-4', variant.border, variant.bg, className)}>
      <div className={cn('bg-gradient-to-r px-3 py-1', variant.header)}>
        <span className="font-retro font-bold text-white text-shadow-sm">{title}</span>
      </div>
      <div className="p-3 text-sm">{children}</div>
    </Component>
  );
}

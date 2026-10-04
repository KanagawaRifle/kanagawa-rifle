import { cn } from '@/lib/utils';

interface Win95WindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  /** セクションとして扱う場合は true */
  asSection?: boolean;
}

/**
 * Windows 95 風ウィンドウコンポーネント
 *
 * @example
 * <Win95Window title="月例会" icon="📅">
 *   <p>コンテンツ</p>
 * </Win95Window>
 */
export function Win95Window({ title, icon = '📅', children, className, asSection = false }: Win95WindowProps) {
  const Component = asSection ? 'section' : 'div';
  const headingId = asSection ? `win95-${title.replace(/\s+/g, '-')}` : undefined;

  return (
    <Component
      className={cn(
        'border-2 border-t-[var(--win95-light,#ffffff)] border-r-[var(--win95-dark,#808080)] border-b-[var(--win95-dark,#808080)] border-l-[var(--win95-light,#ffffff)] bg-[var(--win95-bg,#c0c0c0)]',
        '[box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]',
        className,
      )}
      aria-labelledby={headingId}
    >
      {/* タイトルバー */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[var(--win95-navy,#000080)] to-[#1084d0] px-2 py-1">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-sm" aria-hidden="true">
              {icon}
            </span>
          )}
          {asSection ? (
            <h2
              id={headingId}
              className="text-sm font-bold text-white"
              style={{
                fontFamily: "'MS Sans Serif', 'Microsoft Sans Serif', 'Segoe UI', sans-serif",
              }}
            >
              {title}
            </h2>
          ) : (
            <span
              className="text-sm font-bold text-white"
              style={{
                fontFamily: "'MS Sans Serif', 'Microsoft Sans Serif', 'Segoe UI', sans-serif",
              }}
            >
              {title}
            </span>
          )}
        </div>
      </div>
      <div className="p-1">{children}</div>
    </Component>
  );
}

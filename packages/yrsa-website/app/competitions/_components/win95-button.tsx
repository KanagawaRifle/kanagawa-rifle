import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Win95ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  /** ボタンを無効化 */
  disabled?: boolean;
}

const baseClasses = cn(
  // レイアウト
  'inline-flex items-center justify-center gap-1 px-4 py-1',
  // タイポグラフィ
  'text-sm font-bold',
  // Win95 3D ボーダー
  'border-2 border-t-white border-r-[#808080] border-b-[#808080] border-l-white',
  '[box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]',
  // アクティブ状態（押下時）
  'active:border-t-[#808080] active:border-r-white active:border-b-white active:border-l-[#808080]',
  'active:[box-shadow:inset_1px_1px_0_0_#000000,inset_-1px_-1px_0_0_#dfdfdf]',
  // フォーカス（キーボードナビゲーション時のみ）
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000080] focus-visible:ring-offset-1',
  // トランジション
  'transition-colors',
);

const variantClasses = {
  default: 'bg-[#c0c0c0] text-black hover:bg-[#d4d4d4]',
  primary: 'bg-[#000080] text-white hover:bg-[#0000aa]',
};

const disabledClasses = 'opacity-50 cursor-not-allowed';

/**
 * Windows 95 風ボタンコンポーネント
 *
 * @example
 * <Win95Button href="/page">リンク</Win95Button>
 * <Win95Button variant="primary" onClick={handleClick}>送信</Win95Button>
 */
export function Win95Button({
  href,
  children,
  variant = 'default',
  external = false,
  type = 'button',
  onClick,
  className,
  disabled = false,
}: Win95ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], disabled && disabledClasses, className);

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-disabled={disabled}>
      {children}
    </button>
  );
}

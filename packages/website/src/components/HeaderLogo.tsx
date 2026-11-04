import Link from 'next/link';

// ロゴコンポーネント
export function HeaderLogo() {
  return (
    <Link
      href="/"
      prefetch={false}
      className="inline-flex min-h-10 items-center justify-center text-center font-sans text-xl font-black tracking-wider no-underline"
      aria-label="KRA（神奈川県ライフル射撃協会）トップページへ"
    >
      <span className="text-primary">K</span>
      <span style={{ color: 'var(--color-secondary-bright)' }}>R</span>
      <span className="text-accent">A</span>
    </Link>
  );
}

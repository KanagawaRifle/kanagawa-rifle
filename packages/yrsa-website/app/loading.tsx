/**
 * Global loading UI
 * Displayed during page transitions and data fetching
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center" role="status" aria-label="読み込み中">
      {/* Animated spinner */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-lg font-bold text-purple-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        読み込み中...
      </p>

      {/* Animated dots */}
      <div className="mt-2 flex gap-1" aria-hidden="true">
        <span
          className="inline-block h-2 w-2 rounded-full bg-pink-400 motion-safe:animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-purple-400 motion-safe:animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="inline-block h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {/* Screen reader text */}
      <span className="sr-only">ページを読み込んでいます。少々お待ちください。</span>
    </div>
  );
}

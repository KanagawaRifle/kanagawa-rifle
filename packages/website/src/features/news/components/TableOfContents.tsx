import type { TableOfContentsEntry } from '@/lib/markdown/parse';

export default function TableOfContents({ toc }: { toc: TableOfContentsEntry[] }) {
  if (toc.length === 0) return null;
  const firstLevel = Math.min(...toc.map(({ level }) => level));

  return (
    <div className="bg-muted mb-8 rounded-lg p-4">
      <h2 className="text-foreground mb-3 text-lg font-semibold">目次</h2>
      <nav aria-label="記事の目次">
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`hover:text-primary block text-sm transition-colors duration-200 ${
                  item.level === firstLevel
                    ? 'text-foreground font-semibold'
                    : item.level === firstLevel + 1
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                }`}
                style={{ paddingLeft: `${(item.level - firstLevel) * 12}px` }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

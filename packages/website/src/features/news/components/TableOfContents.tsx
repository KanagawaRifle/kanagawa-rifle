import type { TableOfContentsEntry } from '@/lib/ReactMarkdown';

export default function TableOfContents({ toc }: { toc: TableOfContentsEntry[] }) {
  if (toc.length === 0) return null;

  return (
    <div className="bg-muted mb-8 rounded-lg p-4">
      <h3 className="text-foreground mb-3 text-lg font-semibold">目次</h3>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`hover:text-primary block text-sm transition-colors duration-200 ${
                  item.level === 1
                    ? 'text-foreground font-semibold'
                    : item.level === 2
                      ? 'text-foreground ml-3 font-medium'
                      : 'text-muted-foreground ml-6'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
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

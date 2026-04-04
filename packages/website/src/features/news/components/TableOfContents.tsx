import React from 'react';

const HEADING_REGEX = /^(#{1,6})\s+(.+)$/gm;

export function generateTableOfContents(content: string): Array<{ id: string; title: string; level: number }> {
  // Reset lastIndex for reuse of global regex
  HEADING_REGEX.lastIndex = 0;
  const toc = [];
  let match;

  while ((match = HEADING_REGEX.exec(content)) !== null) {
    const hashes = match[1];
    const rawTitle = match[2];
    if (!hashes || !rawTitle) continue;

    const level = hashes.length;
    const title = rawTitle.trim();
    const id = title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}

export default function TableOfContents({ toc }: { toc: Array<{ id: string; title: string; level: number }> }) {
  if (toc.length === 0) return null;

  return (
    <div className="mb-8 rounded-lg bg-muted p-4">
      <h3 className="mb-3 text-lg font-semibold text-foreground">目次</h3>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors duration-200 hover:text-primary ${
                  item.level === 1
                    ? 'font-semibold text-foreground'
                    : item.level === 2
                      ? 'ml-3 font-medium text-foreground'
                      : 'ml-6 text-muted-foreground'
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

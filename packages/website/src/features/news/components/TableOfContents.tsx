import React from 'react';

export function generateTableOfContents(content: string): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
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
    <div className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">目次</h3>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                  item.level === 1
                    ? 'font-semibold text-gray-900 dark:text-white'
                    : item.level === 2
                      ? 'ml-3 font-medium text-gray-700 dark:text-gray-300'
                      : 'ml-6 text-gray-600 dark:text-gray-400'
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

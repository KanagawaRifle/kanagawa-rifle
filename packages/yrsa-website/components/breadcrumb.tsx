import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** 現在のページ名 */
  current: string;
}

/**
 * パンくずリストコンポーネント（JSON-LD構造化データ付き）
 *
 * Google検索結果にパンくずが表示されるようになります。
 *
 * @example
 * <Breadcrumb
 *   items={[{ name: "競技会", href: "/competitions" }]}
 *   current="月例会"
 * />
 */
export function Breadcrumb({ items, current }: BreadcrumbProps) {
  const allItems = [{ name: 'ホーム', href: '/' }, ...items];

  // JSON-LD BreadcrumbList スキーマ
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteConfig.baseUrl}${item.href}`,
      })),
      {
        '@type': 'ListItem',
        position: allItems.length + 1,
        name: current,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD 構造化データ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* 視覚的なパンくずリスト */}
      <nav aria-label="パンくずリスト" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item) => (
            <li key={item.href} className="flex items-center">
              <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline">
                {item.name}
              </Link>
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400" aria-hidden="true" />
            </li>
          ))}
          <li>
            <span className="text-gray-600" aria-current="page">
              {current}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}

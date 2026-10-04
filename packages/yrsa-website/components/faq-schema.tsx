export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

/**
 * FAQPage 構造化データコンポーネント（JSON-LD）
 *
 * Google検索結果にFAQ（よくある質問）が表示されるようになります。
 *
 * @example
 * <FAQSchema
 *   items={[
 *     { question: "営業時間は？", answer: "8:30〜21:00です。" },
 *     { question: "休場日は？", answer: "毎週月曜日です。" },
 *   ]}
 * />
 */
export function FAQSchema({ items }: FAQSchemaProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
}

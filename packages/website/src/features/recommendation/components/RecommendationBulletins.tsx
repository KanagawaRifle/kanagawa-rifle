import { FileType } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStaticFileUrl } from '@/config/assets';

import { recommendationBulletins } from '../data';

export function RecommendationBulletins() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ピストルを所持中の皆様へ</CardTitle>
        <CardDescription>※ご不明な点は日ラへ直接お問い合わせください。</CardDescription>
      </CardHeader>
      <ul>
        {recommendationBulletins.map((number) => (
          <li key={number} className="border-border flex items-center gap-3 border-b p-4 last:border-b-0">
            <FileType className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
            <a
              href={getStaticFileUrl(`/recommendation/Recommendation_Bulletin_no_${number}.pdf`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:bg-primary/10 underline"
            >
              推薦ブレッテン no.{number}
              <span className="sr-only">（PDF、新しいタブで開く）</span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

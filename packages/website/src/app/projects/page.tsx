// packages/website/src/app/projects/page.tsx

import { FileSpreadsheet, FileText, FileType } from 'lucide-react';

import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStaticFileUrl } from '@/config/assets';
import { paths } from '@/config/paths';
import { createPageMetadata } from '@/lib/metadata';

const FILE_TYPES = {
  EXCEL: { icon: FileSpreadsheet, colorClass: 'text-green-600' },
  WORD: { icon: FileText, colorClass: 'text-blue-600' },
  PDF: { icon: FileType, colorClass: 'text-red-600' },
} as const;

type FileType = keyof typeof FILE_TYPES;

type DocumentItem = {
  filename: string;
  title: string;
  type: FileType;
  version?: string;
};

type YearData = {
  era: string;
  western: string;
  documents: DocumentItem[];
};

const YEARS_DATA: readonly YearData[] = [
  {
    era: '令和8年度',
    western: '2026年度',
    documents: [
      { filename: '/projects/2026/schedule.pdf', title: '事業計画案', type: 'PDF' },
      { filename: '/projects/2026/competitions.pdf', title: '主催大会および推薦申請のご案内', type: 'PDF' },
      { filename: '/projects/2026/membership.pdf', title: '会員資格更新のご案内', type: 'PDF' },
    ],
  },
  {
    era: '令和7年度',
    western: '2025年度',
    documents: [
      { filename: '/projects/2025/schedule.pdf', title: '事業計画(案)', type: 'PDF' },
      { filename: '/projects/2025/competitions.pdf', title: '主催大会および推薦申請のご案内', type: 'PDF' },
      { filename: '/projects/2025/membership.pdf', title: '会員資格更新のご案内', type: 'PDF' },
      { filename: '/projects/2025/entry-fee.pdf', title: '令和7年度からの変更点について', type: 'PDF' },
      { filename: '/projects/2025/entry-fee.pdf', title: '参加料の改定について', type: 'PDF' },
    ],
  },
  {
    era: '令和6年度',
    western: '2024年度',
    documents: [
      { filename: '/projects/2024/schedule.pdf', title: '令和6年度事業計画案', type: 'PDF', version: 'v=1707978030' },
      {
        filename: '/projects/2024/competitions.pdf',
        title: '令和6年度主催大会および推薦申請のご案内',
        type: 'PDF',
        version: 'v=1707978030',
      },
      { filename: '/projects/2024/membership.pdf', title: '会員資格更新のご案内', type: 'PDF' },
    ],
  },
  {
    era: '令和5年度',
    western: '2023年度',
    documents: [
      { filename: '/projects/2023/schedule.pdf', title: '事業計画', type: 'PDF' },
      { filename: '/projects/2023/notification.pdf', title: '会員の皆様へのお知らせ', type: 'PDF' },
      { filename: '/projects/2023/membership.pdf', title: '年会費一覧', type: 'PDF' },
    ],
  },
  {
    era: '令和4年度',
    western: '2022年度',
    documents: [{ filename: '/projects/2022/schedule.xls', title: '事業計画', type: 'EXCEL' }],
  },
  {
    era: '令和3年度',
    western: '2021年度',
    documents: [
      { filename: '/R03yotei0420.xls', title: '事業計画', type: 'EXCEL' },
      { filename: '/R03yoteiura.doc', title: '特記事項', type: 'WORD' },
      { filename: '/R03oshirase.doc', title: '会員の皆様へのお知らせ', type: 'WORD' },
      { filename: '/R03kaihi.doc', title: '年会費一覧', type: 'WORD' },
    ],
  },
] as const;

const buildDocumentUrl = (filename: string, version?: string): string => {
  const versionQuery = version ? `?${version}` : '';
  const fullPath = filename + versionQuery;

  return filename.startsWith('/projects/') ? getStaticFileUrl(fullPath) : fullPath;
};

function DocumentListItem({ item, divider }: { item: DocumentItem; divider: boolean }) {
  const config = FILE_TYPES[item.type];
  const Icon = config.icon;
  const url = buildDocumentUrl(item.filename, item.version);

  return (
    <li className={divider ? 'border-border border-b' : ''}>
      <div className="flex items-center gap-3 p-4">
        <Icon className={`h-5 w-5 ${config.colorClass}`} />
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:bg-primary/10 underline">
          {item.title}
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
      </div>
    </li>
  );
}

function YearCard({ yearData }: { yearData: YearData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{yearData.era}</CardTitle>
        <CardDescription>{yearData.western}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {yearData.documents.map((val, index) => (
            <DocumentListItem
              key={`${val.filename}-${val.title}`}
              item={val}
              divider={index < yearData.documents.length - 1}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const currentPath = paths.main.projects;

export const metadata = createPageMetadata({ title: currentPath.name, description: currentPath.description });

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      {YEARS_DATA.map((yearData) => (
        <YearCard key={yearData.era} yearData={yearData} />
      ))}
    </PageLayout>
  );
}

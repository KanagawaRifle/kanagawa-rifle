// packages/website/src/app/forms/page.tsx

import { Download, FileSpreadsheet, FileText, FileType } from 'lucide-react';
import type { Metadata } from 'next';

import { PageLayout } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { env, paths } from '@/config';

const FILE_TYPES = {
  EXCEL: { icon: FileSpreadsheet, colorClass: 'text-green-600' },
  WORD: { icon: FileText, colorClass: 'text-blue-600' },
  PDF: { icon: FileType, colorClass: 'text-red-600' },
} as const;

interface DownloadItem {
  type: keyof typeof FILE_TYPES;
  filename: string;
  label: string;
}

const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    type: 'EXCEL',
    filename: '/forms/competition.xlsx',
    label: '日ラ・神ラ大会申込書',
  },
  {
    type: 'EXCEL',
    filename: '/forms/membership.xlsx',
    label: '入会申込書',
  },
  {
    type: 'WORD',
    filename: '/forms/dankyu.docx',
    label: '段級審査受験申請書',
  },
  {
    type: 'WORD',
    filename: '/forms/integrity-course.docx',
    label: 'インテグリティ講習会受講申込書',
  },
  {
    type: 'WORD',
    filename: '/forms/rifle-course.docx',
    label: 'ライフル射撃に関する講習会受講申込書',
  },
];

function DownloadItemComponent({ item, divider }: { item: DownloadItem; divider: boolean }) {
  const fileType = FILE_TYPES[item.type];
  const Icon = fileType.icon;

  return (
    <li className={divider ? 'border-b border-border' : ''}>
      <div className="flex items-center gap-3 p-4">
        <Icon className={`h-5 w-5 ${fileType.colorClass}`} />
        <a
          href={paths.cdn.getHref(item.filename)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {item.label}
        </a>
      </div>
    </li>
  );
}

const currentPath = paths.sub.forms;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            ダウンロード
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul>
            {DOWNLOAD_ITEMS.map((item, index) => (
              <DownloadItemComponent key={item.filename} item={item} divider={index < DOWNLOAD_ITEMS.length - 1} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

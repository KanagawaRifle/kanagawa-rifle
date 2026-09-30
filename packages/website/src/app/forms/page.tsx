// packages/website/src/app/forms/page.tsx

import { Download, FileSpreadsheet, FileText, FileType } from 'lucide-react';

import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStaticFileUrl } from '@/config/assets';
import { paths } from '@/config/paths';
import { createPageMetadata } from '@/lib/metadata';

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
    <li className={divider ? 'border-border border-b' : ''}>
      <div className="flex items-center gap-3 p-4">
        <Icon className={`h-5 w-5 ${fileType.colorClass}`} aria-hidden="true" />
        <a
          href={getStaticFileUrl(item.filename)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:bg-primary/10 underline"
        >
          {item.label}
          <span className="sr-only">（ダウンロード、新しいタブで開く）</span>
        </a>
      </div>
    </li>
  );
}

const currentPath = paths.sub.forms;
export const metadata = createPageMetadata({
  title: '申請書・各種様式',
  description: currentPath.description,
  path: currentPath.getHref(),
});

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      page={{ path: currentPath.getHref(), description: currentPath.description, type: 'CollectionPage' }}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <p>{currentPath.description}</p>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" aria-hidden="true" />
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

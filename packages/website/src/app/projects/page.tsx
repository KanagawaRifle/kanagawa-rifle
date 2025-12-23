// packages/website/src/app/projects/page.tsx

import { Card, CardHeader, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';
import { FaFileExcel, FaFileWord, FaFilePdf } from 'react-icons/fa';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

const FILE_TYPES = {
  EXCEL: { icon: <FaFileExcel />, color: 'success.main' as const },
  WORD: { icon: <FaFileWord />, color: 'info.main' as const },
  PDF: { icon: <FaFilePdf />, color: 'error.main' as const },
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

  return filename.startsWith('/projects/') ? paths.cdn.getHref(fullPath) : fullPath;
};

const DocumentListItem: React.FC<{
  item: DocumentItem;
  divider: boolean;
}> = React.memo(({ item, divider }) => {
  const config = FILE_TYPES[item.type];
  const url = buildDocumentUrl(item.filename, item.version);

  return (
    <ListItem divider={divider}>
      <ListItemIcon sx={{ color: config.color }}>{config.icon}</ListItemIcon>
      <ListItemText>
        <Link href={url}>{item.title}</Link>
      </ListItemText>
    </ListItem>
  );
});

DocumentListItem.displayName = 'DocumentListItem';

const YearCard: React.FC<{ yearData: YearData }> = React.memo(({ yearData }) => (
  <Card>
    <CardHeader title={yearData.era} subheader={yearData.western} />
    <List dense>
      {yearData.documents.map((val, index) => (
        <DocumentListItem
          key={`${val.filename}-${val.title}`}
          item={val}
          divider={index < yearData.documents.length - 1}
        />
      ))}
    </List>
  </Card>
));

YearCard.displayName = 'YearCard';

const currentPath = paths.main.projects;

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
      {YEARS_DATA.map((yearData) => (
        <YearCard key={yearData.era} yearData={yearData} />
      ))}
    </PageLayout>
  );
}

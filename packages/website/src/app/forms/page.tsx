// packages/website/src/app/forms/page.tsx

import { Card, CardHeader, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';
import { FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

// ファイル形式の定義
const FILE_TYPES = {
  EXCEL: { icon: <FaFileExcel />, color: 'success.main' as const },
  WORD: { icon: <FaFileWord />, color: 'info.main' as const },
  PDF: { icon: <FaFilePdf />, color: 'error.main' as const },
} as const;

// ダウンロード項目の型定義
interface DownloadItem {
  type: keyof typeof FILE_TYPES;
  filename: string;
  label: string;
}

// ダウンロード項目の設定
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

  return (
    <ListItem divider={divider}>
      <ListItemIcon sx={{ color: fileType.color }}>{fileType.icon}</ListItemIcon>
      <ListItemText>
        <Link href={paths.cdn.getHref(item.filename)} target="_blank">
          {item.label}
        </Link>
      </ListItemText>
    </ListItem>
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
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <LuDownload />
              ダウンロード
            </div>
          }
        />
        <List dense>
          {DOWNLOAD_ITEMS.map((item, index) => (
            <DownloadItemComponent key={index} item={item} divider={index < DOWNLOAD_ITEMS.length - 1} />
          ))}
        </List>
      </Card>
    </PageLayout>
  );
}

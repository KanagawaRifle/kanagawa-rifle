import React from 'react';

import { faFileExcel, faFileWord } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadIcon from '@mui/icons-material/Download';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from '@mui/material/ListItemText';
import type { Metadata } from "next";

import PageHeader from "@kanagawa-rifle/website/components/PageHeader"
import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";
import { createMetadata } from "@kanagawa-rifle/website/site";

import { info } from "./info";

// ファイル形式の定義
const FILE_TYPES = {
  EXCEL: {
    icon: faFileExcel,
    color: 'success.main' as const,
  },
  WORD: {
    icon: faFileWord,
    color: 'info.main' as const,
  }
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
    label: '日ラ・神ラ大会申込書'
  },
  {
    type: 'EXCEL',
    filename: '/forms/membership.xlsx',
    label: '入会申込書'
  },
  {
    type: 'WORD',
    filename: '/forms/dankyu.docx',
    label: '段級審査受験申請書'
  },
  {
    type: 'WORD',
    filename: '/forms/integrity-course.docx',
    label: 'インテグリティ講習会受講申込書'
  },
  {
    type: 'WORD',
    filename: '/forms/rifle-course.docx',
    label: 'ライフル射撃に関する講習会受講申込書'
  }
];

// ダウンロードアイテムコンポーネント
interface DownloadItemProps {
  item: DownloadItem;
  isLast: boolean;
}

function DownloadItemComponent({ item, isLast }: DownloadItemProps) {
  const fileType = FILE_TYPES[item.type];

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ color: fileType.color }}>
          <FontAwesomeIcon icon={fileType.icon} />
        </ListItemIcon>
        <ListItemText>
          <Link href={useStaticFileUrl(item.filename)} target="_blank">
            {item.label}
          </Link>
        </ListItemText>
      </ListItem>
      {!isLast && <Divider component="li" className="border-gray-400" />}
    </>
  );
}

// カードヘッダータイトルコンポーネント
function DownloadCardTitle() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <DownloadIcon />
      ダウンロード
    </Box>
  );
}

export const metadata: Metadata = createMetadata(info);

export default function Page() {
  return (
    <>
      <PageHeader title={info.title} description={info.description} />
      <Card>
        <CardHeader title={<DownloadCardTitle />} />
        <List dense>
          {DOWNLOAD_ITEMS.map((item, index) => (
            <DownloadItemComponent
              key={`${item.type}-${item.filename}`}
              item={item}
              isLast={index === DOWNLOAD_ITEMS.length - 1}
            />
          ))}
        </List>
      </Card>
    </>
  );
}

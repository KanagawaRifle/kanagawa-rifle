import {faFileExcel, faFileWord, faFilePdf} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from '@mui/material/ListItemText';
import type {Metadata} from "next";
import * as React from "react";

import PageHeader from "@kanagawa-rifle/website/components/PageHeader"
import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";
import {createMetadata} from "@kanagawa-rifle/website/site";

import {info} from "./info";

// ファイルタイプ定義
type FileType = 'pdf' | 'excel' | 'word';

// ドキュメント項目の型定義
interface DocumentItem {
  filename: string;
  title: string;
  type: FileType;
  version?: string;
}

// 年度データの型定義
interface YearData {
  era: string;
  western: string;
  documents: DocumentItem[];
}

// ファイルタイプ設定
const FILE_CONFIG = {
  pdf: { icon: faFilePdf, color: 'error.main' as const },
  excel: { icon: faFileExcel, color: 'success.main' as const },
  word: { icon: faFileWord, color: 'info.main' as const }
} as const;

// 年度データ
const YEARS_DATA: YearData[] = [
  {
    era: '令和7年度',
    western: '2025年度',
    documents: [
      { filename: '/projects/2025/schedule.pdf', title: '事業計画（案）', type: 'pdf' },
      { filename: '/projects/2025/competitions.pdf', title: '主催大会および推薦申請のご案内', type: 'pdf' },
      { filename: '/projects/2025/membership.pdf', title: '会員資格更新のご案内', type: 'pdf' },
      { filename: '/projects/2025/entry-fee.pdf', title: '令和7年度からの変更点について', type: 'pdf' },
      { filename: '/projects/2025/entry-fee.pdf', title: '参加料の改定について', type: 'pdf' }
    ]
  },
  {
    era: '令和6年度',
    western: '2024年度',
    documents: [
      { filename: '/projects/2024/schedule.pdf', title: '令和6年度事業計画案', type: 'pdf', version: 'v=1707978030' },
      { filename: '/projects/2024/competitions.pdf', title: '令和6年度主催大会および推薦申請のご案内', type: 'pdf', version: 'v=1707978030' },
      { filename: '/projects/2024/membership.pdf', title: '会員資格更新のご案内', type: 'pdf' }
    ]
  },
  {
    era: '令和5年度',
    western: '2023年度',
    documents: [
      { filename: '/projects/2023/schedule.pdf', title: '事業計画', type: 'pdf' },
      { filename: '/projects/2023/notification.pdf', title: '会員の皆様へのお知らせ', type: 'pdf' },
      { filename: '/projects/2023/membership.pdf', title: '年会費一覧', type: 'pdf' }
    ]
  },
  {
    era: '令和4年度',
    western: '2022年度',
    documents: [
      { filename: '/projects/2022/schedule.xls', title: '事業計画', type: 'excel' }
    ]
  },
  {
    era: '令和3年度',
    western: '2021年度',
    documents: [
      { filename: '/R03yotei0420.xls', title: '事業計画', type: 'excel' },
      { filename: '/R03yoteiura.doc', title: '特記事項', type: 'word' },
      { filename: '/R03oshirase.doc', title: '会員の皆様へのお知らせ', type: 'word' },
      { filename: '/R03kaihi.doc', title: '年会費一覧', type: 'word' }
    ]
  }
];

// ドキュメントアイテムコンポーネント
const DocumentListItem: React.FC<{
  item: DocumentItem;
  isLast: boolean;
}> = React.memo(({ item, isLast }) => {
  const config = FILE_CONFIG[item.type];
  const url = item.filename.startsWith('/projects/')
    ? useStaticFileUrl(item.filename + (item.version ? `?${item.version}` : ''))
    : item.filename;

  return (
    <ListItem divider={!isLast}>
      <ListItemIcon sx={{ color: config.color }}>
        <FontAwesomeIcon icon={config.icon} />
      </ListItemIcon>
      <ListItemText>
        <Link href={url}>{item.title}</Link>
      </ListItemText>
    </ListItem>
  );
});

DocumentListItem.displayName = 'DocumentListItem';

// 年度カードコンポーネント
const YearCard: React.FC<{ yearData: YearData }> = React.memo(({ yearData }) => (
  <Card>
    <CardHeader title={yearData.era} subheader={yearData.western} />
    <List dense={true}>
      {yearData.documents.map((doc, index) => (
        <DocumentListItem
          key={`${doc.filename}-${index}`}
          item={doc}
          isLast={index === yearData.documents.length - 1}
        />
      ))}
    </List>
  </Card>
));

YearCard.displayName = 'YearCard';

// メインコンポーネント
export const metadata: Metadata = createMetadata(info);

export default function Page() {
  return (
    <>
      <PageHeader title={info.title} description={info.description} />
      {YEARS_DATA.map((yearData) => (
        <YearCard key={yearData.era} yearData={yearData} />
      ))}
    </>
  );
}

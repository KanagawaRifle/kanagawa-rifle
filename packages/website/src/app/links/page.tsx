import React from 'react';

import LinkIcon from '@mui/icons-material/Link';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import type {Metadata} from "next";

import PageHeader from "@kanagawa-rifle/website/components/PageHeader"
import {createMetadata} from "@kanagawa-rifle/website/site";

import {info} from "./info";

type LinkItem = {
  href: string;
  title: string;
  description: string;
}

const linkItems: LinkItem[] = [
  {
    href: "https://yokosukarifle.web.fc2.com/",
    title: "横須賀市ライフル射撃協会",
    description: "エアライフル射撃場がある横須賀の有名な射撃協会です。"
  },
  {
    href: "https://www.rs-ennis.com/",
    title: "ガンショップ エニス",
    description: "ライフル射撃競技に使用する銃および用品を輸入販売している専門店です。"
  },
  {
    href: "https://www.fareast-gun.co.jp/",
    title: "ＦＡＲＥＡＳＴ ＧＵＮ ＳＡＬＥＳ",
    description: "コラムは一読しておきたいです。"
  },
  {
    href: "http://www.ginzagun.com/",
    title: "銀座銃砲店",
    description: "日本で最も長い歴史を持つライフル射撃の専門店です。"
  },
  {
    href: "https://www.beach-bum.jp",
    title: "ＢＥＡＣＨ・ＢＵＭ",
    description: "三戸浜にあるホテル＆レストランです。"
  },
  {
    href: "https://isehara-shooting.jp/hour.html",
    title: "伊勢原射撃場",
    description: "ようやく開きました。"
  }
];



type LinkListItemProps = {
  item: LinkItem;
  showDivider?: boolean;
}

function LinkListItem({ item, showDivider = true }: LinkListItemProps){
  return (
    <ListItem divider={showDivider}>
      <ListItemText
        primary={
          <Link href={item.href} target="_blank" rel="noopener noreferrer">
            {item.title}
          </Link>
        }
        secondary={item.description}
      />
    </ListItem>
  );
}


type LinksCardProps = {
  title?: string;
  links: LinkItem[];
}

function LinksCard({ title = "リンク", links }: LinksCardProps) {
  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkIcon sx={{ transform: 'rotate(135deg)' }} />
            {title}
          </Box>
        }
      />
      <List>
        {links.map((link, index) => (
          <LinkListItem
            key={link.href}
            item={link}
            showDivider={index < links.length - 1}
          />
        ))}
      </List>
    </Card>
  );
}

export const metadata: Metadata = createMetadata(info);

export default function LinksPage() {
  return (
    <>
      <PageHeader title={info.title} description={info.description} />
      <LinksCard links={linkItems} />
    </>
  );
}


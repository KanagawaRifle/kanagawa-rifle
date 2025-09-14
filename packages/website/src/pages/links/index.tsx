import * as React from "react";

import LinkIcon from '@mui/icons-material/Link';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import Link from '@mui/material/Link';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';
export default function Page() {
  return (
    <>
      <Meta title="リンク" />

      <MainBody>
        <h2 className="text-center text-xl">リンク</h2>

        <Card>
          <CardHeader
            title={
              <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkIcon  sx={{ display: 'inline-block', transform: 'rotate(135deg)' }}　/>リンク
              </Box>
            }
          />
          <List>
            <ListItem divider>
              <ListItemText
                primary={<Link href="https://yokosukarifle.web.fc2.com/" target="_blank">横須賀市ライフル射撃協会</Link>}
                secondary={"エアライフル射撃場がある横須賀の有名な射撃協会です。"}
              />
            </ListItem>

            <ListItem divider>
              <ListItemText
                primary={<Link href="https://www.rs-ennis.com/" target="_blank">ガンショップ エニス</Link>}
                secondary={"ライフル射撃競技に使用する銃および用品を輸入販売している専門店です。"}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={<Link href="https://www.fareast-gun.co.jp/" target="_blank">ＦＡＲＥＡＳＴ ＧＵＮ ＳＡＬＥＳ</Link>}
                secondary={"コラムは一読しておきたいです。"}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={<Link href="http://www.ginzagun.com/" target="_blank">銀座銃砲店</Link>}
                secondary={"日本で最も長い歴史を持つライフル射撃の専門店です。"}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary={<Link href="https://www.beach-bum.jp" target="_blank">ＢＥＡＣＨ・ＢＵＭ</Link>}
                secondary={"三戸浜にあるホテル＆レストランです。"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Link href="https://isehara-shooting.jp/hour.html" target="_blank">伊勢原射撃場</Link>}
                secondary={"ようやく開きました。"}
              />
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

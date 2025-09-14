import * as React from "react";

import {faFileExcel, faFileWord, faFilePdf} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from '@mui/material/ListItemText';

import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="事業計画" />

      <MainBody>
        <h2 className="text-center text-xl">事業計画</h2>

        <Card>
          <CardHeader title={'令和7年度'} subheader={'2025年度'} />
          <List dense={true}>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2025/schedule.pdf')}>事業計画（案）</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2025/competitions.pdf')}>主催大会および推薦申請のご案内</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2025/membership.pdf')}>会員資格更新のご案内</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2025/entry-fee.pdf')}>令和7年度からの変更点について</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2025/entry-fee.pdf')}>参加料の改定について</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和6年度'} subheader={'2024年度'} />
          <List dense={true}>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2024/schedule.pdf?v=1707978030')}>令和6年度事業計画案</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2024/competitions.pdf?v=1707978030')}>令和6年度主催大会および推薦申請のご案内</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2024/membership.pdf')}>会員資格更新のご案内</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和5年度'} subheader={'2023年度'} />
          <List dense={true}>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2023/schedule.pdf')}>事業計画</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2023/notification.pdf')}>会員の皆様へのお知らせ</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'error.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFilePdf} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2023/membership.pdf')}>年会費一覧</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和4年度'} subheader={'2022年度'} />
          <List dense={true}>
            <ListItem>
              <ListItemIcon sx={{ color: 'success.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileExcel} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/projects/2022/schedule.xls')}>事業計画</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和3年度'} subheader={'2021年度'} />
          <List dense={true}>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'success.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileExcel} /></ListItemIcon>
              <ListItemText>
                <Link href="/R03yotei0420.xls">事業計画</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href="/R03yoteiura.doc">特記事項</Link>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href="/R03oshirase.doc">会員の皆様へのお知らせ</Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href="/R03kaihi.doc">年会費一覧</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

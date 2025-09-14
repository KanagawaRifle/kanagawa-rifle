import * as React from "react";

import {faFileExcel, faFileWord} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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

import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="様式" />

      <MainBody>
        <h2 className="text-center text-xl">様式</h2>

        <Card>
          <CardHeader
            title={
              <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DownloadIcon />ダウンロード
              </Box>
            }
          />
          <List dense={true}>
            <ListItem>
              <ListItemIcon sx={{ color: 'success.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileExcel} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/forms/competition.xlsx')} target="_blank">日ラ・神ラ大会申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemIcon sx={{ color: 'success.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileExcel} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/forms/membership.xlsx')} target="_blank">入会申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/forms/dankyu.docx')} target="_blank">段級審査受験申請書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/forms/integrity-course.docx')} target="_blank">インテグリティ講習会受講申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemIcon sx={{ color: 'info.main' }}><FontAwesomeIcon fixedWidth={true} icon={faFileWord} /></ListItemIcon>
              <ListItemText>
                <Link href={useStaticFileUrl('/forms/rifle-course.docx')} target="_blank">ライフル射撃に関する講習会受講申込書</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

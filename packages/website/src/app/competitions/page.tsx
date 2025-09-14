'use client';

import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import { faBox } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlarmIcon from '@mui/icons-material/Alarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from "@mui/material/Typography";
import * as React from 'react';

import PageHeader from "@kanagawa-rifle/website/components/PageHeader"
import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";

import {info} from "./info";

export default function Page() {
      const [isDialogOpen, setDialogBeOpen] = React.useState(false);

      const handleOpenButtonClick = () => { setDialogBeOpen(true) };
      const handleCloseButtonClick = () => { setDialogBeOpen(false) };

      return (
      <>
        <PageHeader title={info.title} description={info.description} />

        <Tabs
          value={"2025"}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            key={-1}
            sx={{fontWeight: '700'}}
            component={Link as React.ElementType}
            label={"2025"}
            href={`/competitions`}
            value={"2025"}
          />
          {["2024", "2023", "2022"].map((item,index) => {
            return <Tab
              key={index}
              sx={{fontWeight: '700'}}
              component={Link as React.ElementType}
              label={item}
              href={`/competitions/${item}`}
              value={item}
            />
          })}
        </Tabs>

          <Card>
            <CardHeader
              title={'各種大会 (当協会主管以外) 申込'}
              action={
                <IconButton aria-label="申込フォームの説明" onClick={handleOpenButtonClick}>
                  <HelpIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Button
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faWpforms} />}
                href="https://forms.gle/6XGY1qhEvr3gkasJ9"
                target="_blank"
              >
                日ラ等大会申込
              </Button>
            </CardContent>
            <Dialog
              open={isDialogOpen}
              onClose={handleCloseButtonClick}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"このお申込みフォームについて"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  当協会主管以外の各種大会 (日ラ等) および東日本選手権については本申込フォームよりお申し込みください。
                  <br />なお、国スポ予選および県選手権については下記に個別のお申込みフォームがございますのでそちらよりお申し込みください。
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseButtonClick} autoFocus>
                  閉じる
                </Button>
              </DialogActions>
            </Dialog>
          </Card>

          <Card>
            <CardHeader title={'参加料'} />
            <CardContent>
              <Box className={('grid grid-cols-3 gap-0 text-center mx-auto')}>
                <Box><Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>種別</Typography></Box>
                <Box sx={{ p: 1 }}>
                  <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-purple-400'} size={'xs'} icon={faBox} aria-hidden="true" />一般</Box>
                </Box>
                <Box sx={{ p: 1 }}>
                  <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-rose-400'} size={'xs'} icon={faBox} aria-hidden="true" />高校生以下</Box>
                </Box>
              </Box>
              <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>全種目</Box>
              <Box className="grid grid-cols-3 gap-0 text-center">
                <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">G3 大会</Box>
                <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />8,000円</Box>
                <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />4,000円</Box>
              </Box>
              <Box className="grid grid-cols-3 gap-0 text-center">
                <Box sx={{ p: 1, textAlign: "left"}} color="text.secondary">G4 大会</Box>
                <Box sx={{ p: 1 }}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />7,000円</Box>
                <Box sx={{ p: 1 }}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />3,500円</Box>
              </Box>
            </CardContent>
            <CardContent>
              <p>※ （令和7年度より）国スポ保険料の<strong className="underline">別途お振込みは不要です</strong>。保険料は参加料に含まれます。</p>
              <p>※ ハンドライフルは普及大会となります。</p>
              <p>※ （令和7年度より）すべての大会が参加賞付きとなります。</p>
              <p>※ （令和7年度より）これまでの参加料は、紙標的を使用した大会を前提に設定しておりましたが、このたび複雑な料金体系を整理し、より分かりやすい参加料に改定いたしました。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader subheader={'G3 大会'} title={'第6回秋季神奈川オープン 兼 県選手権大会'} />
            <CardContent>
              <ButtonGroup variant="outlined">
                <Button href="https://forms.gle/G8t7vH7DsRERi5Vx6" target="_blank">申込</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-details.pdf')} target="_blank">要項</Button>
                <Button disabled href={useStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-start-lists.pdf')} target="_blank">射座</Button>
                <Button disabled href={useStaticFileUrl('/competitions/2025/2025-12-14-autumn-kanagawa-open-championship-results')} target="_blank">成績</Button>
              </ButtonGroup>
            </CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：12月14日（日）← <del>11月2日（日）</del>
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：11月26日（水）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                  <Link href="https://www.isehara-shooting.jp/index.html" target="_blank">
                    神奈川県立伊勢原射撃場
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Card>

          <Card>
            <CardHeader subheader="G3 大会" title="第62回全関東ライフル射撃競技選手権大会" />
            <CardContent>
              <ButtonGroup variant="outlined">
                <Button href="https://sites.google.com/meiwakenoh.ed.jp/kanto-block-rifletournament/" target="_blank">大会ページ</Button>
              </ButtonGroup>
            </CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：8月15日（金）― 17日（日）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                  <Link href="https://www.nagatoro-shooting.jp/" target="_blank">
                    埼玉県長瀞射撃場
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Card>

          <Card>
            <CardHeader subheader="G2 大会" title="第55回東日本ライフル射撃競技選手権大会" />
            <CardContent>
              <ButtonGroup variant="outlined">
                <Button href={useStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-details.pdf')} target="_blank">要項</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-start-lists.pdf')} target="_blank">射座</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-06-19-eastern-japan-results.pdf')} target="_blank">成績</Button>
              </ButtonGroup>
            </CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：6月19日（木）― 22日（日）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <HourglassTopIcon color="primary" sx={{mr: 1}} />公式練習：6月19日（木)
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月14日（水）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                  <Link href="https://www.isehara-shooting.jp/index.html" target="_blank">
                    神奈川県立伊勢原射撃場
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Card>

          <Card>
            <CardHeader subheader="G3 大会" title={"第1回春季神奈川オープン 兼 国スポ最終予選会 兼 全関東選手権予選会"} />
            <CardContent>
              <ButtonGroup variant="outlined">
                <Button href="https://forms.gle/7LsDy9e64x5XbV8C9" target="_blank">申込</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-05-25-spring-kanagawa-open-championship-details.pdf')} target="_blank">要項</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-05-25-spring-kanagawa-open-championship-start-lists.pdf')} target="_blank">射座</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-05-25-spring-kanagawa-open-championship-results.pdf')} target="_blank">成績</Button>
              </ButtonGroup>
            </CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：5月25日（日）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月7日（水）
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                  <Link href="https://www.isehara-shooting.jp/index.html" target="_blank">
                    神奈川県立伊勢原射撃場
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Card>

          <Card>
            <CardHeader subheader="G4 大会" title="国スポ一次予選会 兼 東日本選手権予選会" />
            <CardContent>
              <ButtonGroup variant="outlined">
                <Button href={useStaticFileUrl('/competitions/2025/2025-04-27-kokuspo-trials-1st-start-lists.pdf')} target="_blank">射座割</Button>
                <Button href={useStaticFileUrl('/competitions/2025/2025-04-27-kokuspo-trials-1st-results.pdf')} target="_blank">成績</Button>
              </ButtonGroup>
            </CardContent>
            <List dense={true}>
              <ListItem>
                <ListItemText>
                  <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：4月27日 (日)
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：4月19日 (土)
                </ListItemText>
              </ListItem>
              <Divider component="li" className="border-gray-400" />
              <ListItem>
                <ListItemText>
                  <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                  <Link href="https://www.isehara-shooting.jp/index.html" target="_blank">
                    神奈川県立伊勢原射撃場
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Card>

        </>
        );
        }

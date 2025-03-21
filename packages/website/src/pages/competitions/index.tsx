import * as React from 'react';

import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlarmIcon from '@mui/icons-material/Alarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpIcon from '@mui/icons-material/Help';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Divider from '@kanagawa-rifle/website/components/Divider';
import Link from '@kanagawa-rifle/website/components/Link';
import List from '@kanagawa-rifle/website/components/List';
import ListItem from '@kanagawa-rifle/website/components/ListItem';
import ListItemText from '@kanagawa-rifle/website/components/ListItemText';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  const [isDialogOpen, setDialogBeOpen] = React.useState(false);

  const handleOpenButtonClick = () => { setDialogBeOpen(true) };
  const handleCloseButtonClick = () => { setDialogBeOpen(false) };

  return (
    <>
      <Meta title="大会関係" />

      <MainBody>
        <h2 className="text-center text-xl">大会関係</h2>

        <Tabs
          value={"2025"}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            key={-1}
            className={'font-bold'}
            component={Link as React.ElementType}
            label={"2025"}
            href={`/competitions`}
            value={"2025"}
          />
          {["2024", "2023", "2022"].map((item,index) => {
            return <Tab
              key={index}
              className={'font-bold'}
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
            令和7年度参加料についてはただいま協議中です。
          {/*  ※ 国スポ予選参加者は、参加料に国スポ予選登録料 (国スポ保健料) 1,500円を加算してお振り込みください (一次予選申し込み時の1回のみ)。*/}
          {/*  <br />※ ハンドライフルは普及大会となります。*/}
          {/*</CardContent>*/}
          {/*<CardContent>*/}
          {/*  <Box className={('grid grid-cols-3 gap-0 text-center mx-auto')}>*/}
          {/*    <Box><Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>種別</Typography></Box>*/}
          {/*    <Box sx={{ p: 1 }}>*/}
          {/*      <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-purple-400'} fixedWidth={true} size={'xs'} icon={faBox} aria-hidden="true" />一般</Box>*/}
          {/*    </Box>*/}
          {/*    <Box sx={{ p: 1 }}>*/}
          {/*      <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-rose-400'} fixedWidth={true} size={'xs'} icon={faBox} aria-hidden="true" />高校生以下</Box>*/}
          {/*    </Box>*/}
          {/*  </Box>*/}
          {/*  <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>50メートル種目</Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">50m SB3×20</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />7,000円</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}>―</Box>*/}
          {/*  </Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{ p: 1, textAlign: "left"}} color="text.secondary">50m SB60PR</Box>*/}
          {/*    <Box sx={{ p: 1 }}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />7,000円</Box>*/}
          {/*    <Box sx={{ p: 1 }}>―</Box>*/}
          {/*  </Box>*/}
          {/*  <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>10メートル種目</Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m AR60S</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />3,000円</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />2,500円</Box>*/}
          {/*  </Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m AP60</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />4,500円</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />4,000円</Box>*/}
          {/*  </Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m BR60S/BP60</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />2,500円</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />1,000円</Box>*/}
          {/*  </Box>*/}
          {/*  <Box className="grid grid-cols-3 gap-0 text-center">*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m HR40<sup>※</sup></Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} />4,000円</Box>*/}
          {/*    <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}>―</Box>*/}
          {/*  </Box>*/}
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader={'G3 大会'} title={'第6回秋季神奈川オープン 兼 県選手権大会'} />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="https://forms.gle/G8t7vH7DsRERi5Vx6" target="_blank">申込</Button>
              <Button disabled href="" target="_blank">要項</Button>
              <Button disabled href="" target="_blank">射座割</Button>
              <Button disabled href="" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：11月2日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：10月15日（水）
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
              <Button href="https://sites.google.com/u/0/d/1chBf6UpHnIgwcepBYljhkzHgpby3P9KN/preview" target="_blank">大会ページ</Button>
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
              <Button href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2025/2025-06-19-eastern-japan-details.pdf" target="_blank">要項</Button>
              <Button disabled href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2025/2025-06-19-eastern-japan-start-lists.pdf" target="_blank">射座割</Button>
              <Button disabled href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2025/2025-06-19-eastern-japan-results.pdf" target="_blank">成績</Button>
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
              <Button disabled href="" target="_blank">要項</Button>
              <Button disabled href="" target="_blank">射座割</Button>
              <Button disabled href="" target="_blank">成績</Button>
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
              <Button href="https://forms.gle/wjy9npz8badzqoPE6" target="_blank">申込</Button>
              <Button disabled href="" target="_blank">射座割</Button>
              <Button disabled href="" target="_blank">成績</Button>
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

      </MainBody>
    </>
  );
}

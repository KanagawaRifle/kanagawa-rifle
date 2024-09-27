import * as React from 'react';

import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {faBox} from "@fortawesome/free-solid-svg-icons";
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";

import Alert from '@kanagawa-rifle/website/components/Alert';
import AlertTitle from '@kanagawa-rifle/website/components/AlertTitle';
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

        <Alert severity="info">
          <AlertTitle>大会参加料改定のお知らせ</AlertTitle>
          当協会が開催する大会について, 7月1日より, 大会参加料を下記の通り改定いたします。
          <div className="pl-4">ビーム種目少年男子・少年女子：旧2,000円 ➔ 新1,000円</div>
        </Alert>

        <Card>
          <CardHeader
            subheader={'令和6年度'}
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
                <br />なお、国体予選および県選手権については下記に個別のお申込みフォームがございますのでそちらよりお申し込みください。
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
          <CardHeader title={'参加料 (当協会主管Ｇ４)'} />
          <CardContent>
            ※ 国スポ予選参加者は、参加料に国スポ予選登録料 (国スポ保健料) 1,500円を加算してお振り込みください (一次予選申し込み時の1回のみ)。
            <br />※ ハンドライフルは普及大会となります。
          </CardContent>
          <CardContent>
            <Box className={('grid grid-cols-3 gap-0 text-center mx-auto')}>
              <Box><Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>種別</Typography></Box>
              <Box sx={{ p: 1 }}>
                <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-purple-400'} fixedWidth={true} size={'xs'} icon={faBox} aria-hidden="true" />一般</Box>
              </Box>
              <Box sx={{ p: 1 }}>
                <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-rose-400'} fixedWidth={true} size={'xs'} icon={faBox} aria-hidden="true" />高校生以下</Box>
              </Box>
            </Box>
            <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>50メートル種目</Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">50m SB3×20</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />7,000円</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}>―</Box>
            </Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{ p: 1, textAlign: "left"}} color="text.secondary">50m SB60PR</Box>
              <Box sx={{ p: 1 }}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />7,000円</Box>
              <Box sx={{ p: 1 }}>―</Box>
            </Box>
            <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>10メートル種目</Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m AR60S</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />3,000円</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />2,500円</Box>
            </Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m AP60</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />4,500円</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />4,000円</Box>
            </Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m BR60S/BP60</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />2,500円</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} aria-hidden="true" />1,000円</Box>
            </Box>
            <Box className="grid grid-cols-3 gap-0 text-center">
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1, textAlign: "left"}} color="text.secondary">10m HR40<sup>※</sup></Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}><CheckCircleIcon fontSize="small" color="primary" sx={{mr: 1, opacity: 0.6}} />4,000円</Box>
              <Box sx={{borderBottom: '1px solid #dadce0', p: 1}}>―</Box>
            </Box>
          </CardContent>
        </Card>

        <h2 className="text-center text-2xl">2024年度 (令和6年度)</h2>

        <Card>
          <CardHeader subheader="令和6年度" title="全関東マスターズライフル射撃競技大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-11-03-zenkanto-masters-details.pdf" target="_blank">要項</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：11月3日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                 群馬県ライフル射撃場
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader="令和6年度" title="全関東ＡＰ・ＨＲ射撃競技大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-11-03-zenkanto-ap-hr-details.pdf" target="_blank">要項</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：11月3日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <LocationOnIcon color="primary" sx={{mr: 1}} />会場：
                群馬県ライフル射撃場
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和6年度'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-10-27-kanagawa-open-championship-details.pdf" target="_blank">要項</Button>
              <Button href="https://forms.gle/4dFcKUeg7biuJU4X9" target="_blank">申込</Button>
              <Button disabled>射座割</Button>
              <Button disabled>成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：10月27日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：10月16日（水）
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
          <CardHeader subheader="令和6年度" title="第61回全関東ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：8月16日（金）― 18日（日）
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
          <CardHeader subheader="令和6年度" title="第54回東日本ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：6月21日（金）― 23日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <HourglassTopIcon color="primary" sx={{mr: 1}} />公式練習：6月20日（木)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月15日（水）
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
          <CardHeader subheader="令和6年度" title="国スポ最終予選兼全関東予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-start-lists.pdf">射座割</Button>
              <Button href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-results.pdf">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：5月26日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月8日（水）
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
          <CardHeader subheader="令和6年度" title="国スポ一次予選兼東日本予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：4月21日
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：4月3日 (水)
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

        <h2 className="text-center text-2xl">2023年度 (令和5年度)</h2>

        <Card>
          <CardHeader subheader="令和5年度" title="県ジュニアライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：2月24日 (土) ― 2月25日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：2月5日 (月)
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
          <CardHeader subheader="令和5年度" title="神奈川オープン兼県ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：11月5日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：10月22日 (日)
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
          <CardHeader subheader="令和5年度" title="第60回全関東ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2023/2023-08-18-zen-kanto-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf" target="_blank">射座割</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：8月18日（金）― 8月20日（日）
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：7月20 日(金)
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
          <CardHeader subheader="令和5年度" title="国体最終予選兼全関東予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2023/2023-05-21-kokutai-trials-2nd-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2023/2023-05-21-kokutai-trials-2nd-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：5月21日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月5日 (金)
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
          <CardHeader subheader="令和5年度" title="国体一次予選兼東日本予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2023/2023-04-23-kokutai-trials-1st-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2023/2023-04-23-kokutai-trials-1st-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：4月23日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：4月7日 (金)
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

        <h2 className="text-center text-2xl">2022年度 (令和4年度)</h2>

        <Card>
          <CardHeader subheader="令和4年度" title="神奈川オープン兼県ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：11月6日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：10月26日 (水)
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
          <CardHeader subheader="令和4年度" title="国体最終予選兼全関東予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2022/2022-05-22-kokutai-trials-2nd-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2022/2022-05-22-kokutai-trials-2nd-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：5月22日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：5月6日 (金)
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
          <CardHeader subheader="令和4年度" title="国体一次予選兼東日本予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2022/2022-04-24-kokutai-trials-1st-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2022/2022-04-24-kokutai-trials-1st-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <CalendarMonthIcon color="primary" sx={{mr: 1}} />期日：4月24日 (日)
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <AlarmIcon color="primary" sx={{mr: 1}} />申込締切：4月8日 (金)
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

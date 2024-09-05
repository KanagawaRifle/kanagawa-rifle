import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActionArea from '@mui/material/CardActionArea';

import Alert from '@kanagawa-rifle/website/components/Alert';
import AlertTitle from '@kanagawa-rifle/website/components/AlertTitle';
import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import CardMedia from '@kanagawa-rifle/website/components/CardMedia';
import Link from '@kanagawa-rifle/website/components/Link';
import Stack from '@kanagawa-rifle/website/components/Stack';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Meta
        title="NPO法人神奈川県ライフル射撃協会"
        category="メインページ"
        description="特定非営利活動法人神奈川県ライフル射撃協会の公式サイトです。"
      />

      <MainBody>

        <Box className={'text-center'}>
          <Box className={'text-xs text-slate-700'}>特定非営利活動法人</Box>
          <Box component={'h1'} className={'font-bold text-2xl'} sx={{}}>
            <Box component={'span'} sx={{color: theme.palette.primary.main}}>神奈川県</Box>
            <Box component={'span'} sx={{color: theme.palette.secondary.main}}>ライフル射撃</Box>
            <Box component={'span'} sx={{color: "#4285f4"}}>協会</Box>
          </Box>
        </Box>

        <Alert severity="info">
          <AlertTitle>各種大会 (当協会主管以外) 申込</AlertTitle>
          <Stack spacing={2}>
            <div>
              各種大会 (当協会主管以外) および東日本選手権については下記よりお申し込みください。<br />
              ※国体スポ予選および県選手権については<Link href="/competitions">個別のお申込みフォーム</Link>がございますのでそちらよりお申し込みください。
            </div>
            <div>
              <Button
                variant="outlined"
                startIcon={<FontAwesomeIcon fixedWidth={true} size="sm" icon={faWpforms} />}
                href="https://forms.gle/6XGY1qhEvr3gkasJ9"
                target="_blank"
              >
                日ラ等大会申込
              </Button>
            </div>

          </Stack>
        </Alert>

        <Card>
          <CardActionArea component={Link} href="/static/news/2024-02-02-01-kokuspo-trial-poster.pdf" target="_blank">
            <CardMedia component="img" height="164" image="/static/news/2024-02-22-02-card.png" alt="国スポ予選ポスター" />
          </CardActionArea>
        </Card>

        <Card>
          <CardContent>
            <ul className="h-48 overflow-y-scroll">
              <li className="flex">
                <span className="w-32 block">2024年9月5日</span>
                <span className="block flex-1">全関東マスターズライフル射撃競技大会の要項を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年9月5日</span>
                <span className="block flex-1">全関東ＡＰ・ＨＲ射撃競技大会の要項を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年8月18日</span>
                <span className="block flex-1">第61回全関東選手権の成績を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年8月8日</span>
                <span className="block flex-1">第61回全関東選手権の射座割を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年5月26日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-results.pdf">国スポ最終予選の成績</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年5月16日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-start-lists.pdf">国スポ最終予選の射座割</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年4月21日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-results.pdf">国スポ一次予選の競技結果</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年4月16日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-start-lists.pdf">国スポ一次予選の射座割表</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年3月8日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2024/2024-06-21-eastern-japan-championship-details.pdf">第54回東日本選手権の要項</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年2月29日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf">令和5年度神奈川県ジュニア選手権の競技結果</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年2月15日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/">事業計画</Link> ページを更新</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年2月9日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-start-lists.pdf">令和5年度神奈川県ジュニア選手権の射座割</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年1月11日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/projects/2024/membership.pdf">会員資格更新のご案内</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2024年1月6日</span>
                <span className="block flex-1"><Link href="/static/news/2024-01-06-01-attachment.pdf" target="_blank">訃報</Link></span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年12月2日</span>
                <span className="block flex-1"><Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_56.pdf">推薦ブレッテン no.56</Link> を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年11月5日</span>
                <span className="block flex-1"><Link href="/static/competitions/2023/2023-12-10-tochigi-22lr-100m.pdf">2023年度栃木県ライフル射撃競技大会 (100m SB 大会)</Link> の要項を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年10月27日</span>
                <span className="block flex-1">令和5年度神奈川オープン兼県選手権大会の射座割表を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年9月18日</span>
                <span className="block flex-1">令和5年度神奈川オープン兼県選手権大会の要項を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年8月4日</span>
                <span className="block flex-1">
                  <Link href="/static/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf">
                    全関東ライフル射撃競技選手権大会の射座割
                  </Link>
                  を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年7月7日</span>
                <span className="block flex-1">
                  <Link href="/static/competitions/2023/2023-08-18-zen-kanto-details.pdf">
                    全関東ライフル射撃競技選手権大会の要項
                  </Link>
                  を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年6月15日</span>
                <span className="block flex-1">大会参加料改定のお知らせを掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年5月24日</span>
                <span className="block flex-1">
                  <Link href="/projects">令和5年度事業計画の最新版</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年5月21日</span>
                <span className="block flex-1">
                  <Link href="/competitions">国体最終予選競技結果</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年5月29日</span>
                <span className="block flex-1">
                  <Link href="/competitions">国体最終予選射座割表</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年4月28日</span>
                <span className="block flex-1">
                  <Link href="/competitions">国体一次予選競技結果</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年4月15日</span>
                <span className="block flex-1">
                  <Link href="/competitions">国体一次予選射座割表</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年2月23日</span>
                <span className="block flex-1">
                  <Link href="/projects">令和5年度事業計画案</Link>を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2023年2月23日</span>
                <span className="block flex-1">
                  <Link href="/recommendation">令和5年度推薦スケジュール</Link>を更新
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年12月6日</span>
                <span className="block flex-1">
                  <Link href="/static/competitions/2022/start_lists_2022_12_10_kanto_masters.pdf">
                    全関東ＡＰＨＲ＆全関東マスターズ大会の射座割
                  </Link>
                  を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年11月18日</span>
                <span className="block flex-1">
                  <Link href="/static/competitions/2022/details_2022_12_11_tochigi_100m_sb.pdf">
                    2022年度 栃木県ライフル射撃競技大会 (100 m SB) の要項
                  </Link>
                  を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年11月 7日</span>
                <span className="block flex-1">
                  <Link href="/competitions/2022/results/">神奈川県選手権大会の競技結果</Link>
                  を公開
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年11月 7日</span>
                <span className="block flex-1">
                  <Link href="/static/competitions/2022/details_2022_12_10_kanto_masters.pdf">
                    全関東ＡＰＨＲ＆全関東マスターズ大会の要項
                  </Link>
                  を掲載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年11月 2日</span>
                <span className="block flex-1">
                  <Link href="/competitions/2022/kanagawa-open-championship/startlists/">
                    神奈川県選手権大会の射座割表
                  </Link>
                  を公開
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 9月21日</span>
                <span className="block flex-1">
                  <Link href="/competitions/2022/kanagawa-open-championship/">神奈川県選手権大会のお知らせ</Link>
                  を追加
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 5月24日</span>
                <span className="block flex-1">「大会関係」に国体最終予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 5月14日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 5月10日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 5月 8日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 4月26日</span>
                <span className="block flex-1">「大会関係」に国体一次予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 4月19日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 4月16日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 4月13日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年 4月10日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2022年1月23日</span>
                <span className="block flex-1">「事業計画」に令和４年度年間予定（案）</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年11月16日</span>
                <span className="block flex-1">「大会関係」に神奈川県ライフル射撃競技選手権大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年11月4日</span>
                <span className="block flex-1">神奈川県ライフル射撃競技選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年10月16日</span>
                <span className="block flex-1">
                  全関東マスターズ大会・全関東ＡＰ／ＨＲ大会の要項
                  <br />
                  神奈川県選手権大会の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 7月 4日</span>
                <span className="block flex-1">全日本兼リハーサル大会の締め切りについて</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 6月28日</span>
                <span className="block flex-1">日ラからの「東京２０２０射撃競技有償譲渡のご案内」</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 6月 5日</span>
                <span className="block flex-1">「大会関係」に三県対抗選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 5月 2日</span>
                <span className="block flex-1">関東ブロック・全関東要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月29日</span>
                <span className="block flex-1">東日本ライフル競技選手権大会中止</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月27日</span>
                <span className="block flex-1">「大会関係」に国体最終予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割り</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月13日</span>
                <span className="block flex-1">東日本申込注意点</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月10日</span>
                <span className="block flex-1">「推薦関係」に日ラネット登録開始日変更を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 4月 3日</span>
                <span className="block flex-1">「推薦関係」に推薦方法の変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 3月23日</span>
                <span className="block flex-1">「大会関係」に国体一次予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 3月19日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割り修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 3月15日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割り修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2021年 3月13日</span>
                <span className="block flex-1">「大会関係」に国体一次予選射座割り</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年11月7日</span>
                <span className="block flex-1">
                  「大会関係」に２０２０年度神奈川オープン兼神奈川県ライフル射撃競技選手権大会結果
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年11月7日</span>
                <span className="block flex-1">
                  ２０２０年度神奈川オープン兼神奈川県ライフル射撃競技選手権大会射座割
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年10月13日</span>
                <span className="block flex-1">
                  ２０２０年度神奈川オープン兼神奈川県ライフル射撃競技選手権大会要項修正
                  <br />
                  全関東マスターズ大会・全関東ＡＰ／ＨＲ大会の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年9月29日</span>
                <span className="block flex-1">２０２０年度神奈川オープン兼神奈川県ライフル射撃競技選手権大会要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年9月22日</span>
                <span className="block flex-1">
                  「大会関係」に２０２０年度全関東シニアライフル射撃競技選手権大会結果発表
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年9月16日</span>
                <span className="block flex-1">２０２０年度全関東シニアライフル射撃競技選手権大会の射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年9月14日</span>
                <span className="block flex-1">２０２０年度全関東シニアライフル射撃競技選手権大会の射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年9月12日</span>
                <span className="block flex-1">２０２０年度全関東シニアライフル射撃競技選手権大会の射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年8月25日</span>
                <span className="block flex-1">
                  「大会関係」に２０２０年度全関東ジュニアライフル射撃競技選手権大会結果発表
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年8月18日</span>
                <span className="block flex-1">２０２０年度全関東シニアライフル射撃競技選手権大会の要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年8月15日</span>
                <span className="block flex-1">２０２０年度全関東ジュニアライフル射撃競技選手権大会の射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年8月6日</span>
                <span className="block flex-1">２０２０年度全関東ジュニアライフル射撃競技選手権大会の射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年8月2日</span>
                <span className="block flex-1">２０２０年度全関東ジュニアライフル射撃競技選手権大会の射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年7月9日</span>
                <span className="block flex-1">２０２０年度全関東ジュニアライフル射撃競技選手権大会の要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年4月18日</span>
                <span className="block flex-1">「事業計画」に令和２年度年間予定（案）2020年04月14日版</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年4月11日</span>
                <span className="block flex-1">国体最終予選中止のお知らせ</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年4月4日</span>
                <span className="block flex-1">国体1次予選中止のお知らせ</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年3月7日</span>
                <span className="block flex-1">国体予選延期のお知らせ</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2020年2月2日</span>
                <span className="block flex-1">「事業計画」に令和２年度年間予定（案）</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年12月12日</span>
                <span className="block flex-1">「トップページ」の全関東マスターズ／ＡＰ・ＨＲ大会射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年12月7日</span>
                <span className="block flex-1">「トップページ」に全関東マスターズ／ＡＰ・ＨＲ大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年11月26日</span>
                <span className="block flex-1">「大会関係」に県選手権大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年11月16日</span>
                <span className="block flex-1">「大会関係」に県選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年10月22日</span>
                <span className="block flex-1">
                  「トップページ」に神奈川県選手権大会の要項
                  <br />
                  「トップページ」に全関東マスターズ大会・全関東ＡＰ／ＨＲ大会の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月22日</span>
                <span className="block flex-1">「トップページ」に関東ブロック及び全関東の要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月21日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月11日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選50m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月10日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選50m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月9日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月7日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年5月6日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年4月23日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年4月20日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年4月16日</span>
                <span className="block flex-1">
                  「大会関係」に神奈川県国体１次予選50m射座割
                  <br />
                  「大会関係」に国体予選１次10m結果
                  <br />
                  「事業計画」に平成３１年度年間予定案更新
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年4月8日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選10m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年4月7日</span>
                <span className="block flex-1">
                  「大会関係」に神奈川県国体１次予選10m射座割
                  <br />
                  「事業計画」に平成３１年度年間予定案更新
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2019年3月5日</span>
                <span className="block flex-1">「事業計画」に平成３１年度年間予定案</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年12月6日</span>
                <span className="block flex-1">トップページに全関東マスターズ及び全関東ＡＰ・ＨＲ大会の射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年11月15日</span>
                <span className="block flex-1">
                  「大会関係」に神奈川県選手権大会結果
                  <br />
                  トップページに全関東マスターズ及び全関東ＡＰ・ＨＲ大会の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年11月6日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年10月14日</span>
                <span className="block flex-1">
                  ＨＰ移転のお知らせ
                  <br />
                </span>
                <span className="block flex-1">県選手権大会要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年7月31日</span>
                <span className="block flex-1">トップページに関東ブロック大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年6月3日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年5月12日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選50m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年5月8日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年5月3日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月30日</span>
                <span className="block flex-1">全関東選手権の要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月24日</span>
                <span className="block flex-1">オリンピック役員・ボランティア募集</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月24日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月20日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月14日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年4月7日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選10m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2018年3月4日</span>
                <span className="block flex-1">「事業計画」に３０年度の事業計画を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年11月14日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年11月3日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年5月24日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年5月11日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選50m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年5月9日</span>
                <span className="block flex-1">
                  トップページに新茨城県営ライフル射撃場開場記念ライフル射撃競技大会の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年5月5日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年5月3日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体最終予選10m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月24日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月22日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月18日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選10m結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月15日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選50m射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月9日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年4月8日</span>
                <span className="block flex-1">「大会関係」に神奈川県国体１次予選射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年3月20日</span>
                <span className="block flex-1">「事業計画」に２９年度の事業計画を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2017年2月27日</span>
                <span className="block flex-1">「事業計画」に２９年度の事業計画(案)を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年11月8日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年11月1日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年10月29日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年10月27日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年8月22日</span>
                <span className="block flex-1">トップページに関東ブロック・関東選手権大会の結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年8月15日</span>
                <span className="block flex-1">
                  トップページに関東選手権大会の射座割
                  <br />
                  「大会関係」に三県対抗戦結果
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年7月3日</span>
                <span className="block flex-1">トップページに全関東大会の要綱</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月30日</span>
                <span className="block flex-1">「大会関係」に国体最終予選10・50mの結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月22日</span>
                <span className="block flex-1">「大会関係」に国体最終予選50mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月17日</span>
                <span className="block flex-1">「大会関係」の国体予選50mの射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月8日</span>
                <span className="block flex-1">「大会関係」に国体最終予選10mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月7日</span>
                <span className="block flex-1">「大会関係」に国体最終予選10mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月3日</span>
                <span className="block flex-1">「大会関係」に国体最終予選10mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年5月2日</span>
                <span className="block flex-1">「大会関係」に国体最終予選10mの射座割を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月29日</span>
                <span className="block flex-1">「大会関係」の国体予選50mの結果を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月22日</span>
                <span className="block flex-1">「事業計画」に２８年度の事業計画を更新</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月19日</span>
                <span className="block flex-1">「大会関係」の国体予選50mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月15日</span>
                <span className="block flex-1">「大会関係」の国体予選10mの射座割を修正・50mの射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月9日</span>
                <span className="block flex-1">「大会関係」の国体予選10mの射座割を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年4月6日</span>
                <span className="block flex-1">「大会関係」に国体予選10mの射座割を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2016年2月2日</span>
                <span className="block flex-1">「事業計画」に２８年度の事業計画(案)を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年11月12日</span>
                <span className="block flex-1">「大会関係」に県選手権大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年11月1日</span>
                <span className="block flex-1">「大会関係」に県選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年7月5日</span>
                <span className="block flex-1">「大会関係」に東日本大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年6月13日</span>
                <span className="block flex-1">「大会関係」に東日本大会射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年6月11日</span>
                <span className="block flex-1">「大会関係」に東日本大会射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年6月9日</span>
                <span className="block flex-1">
                  「大会関係」に東日本大会射座割修正
                  <br />
                  トップに全関東の要項
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年6月9日</span>
                <span className="block flex-1">「大会関係」に東日本大会射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年5月27日</span>
                <span className="block flex-1">「大会関係」に国体最終予選結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年5月2日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年4月18日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年4月15日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年4月5日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年4月5日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2015年3月20日</span>
                <span className="block flex-1">「事業計画」に２７年度の事業計画(案)を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年11月3日</span>
                <span className="block flex-1">「県選手権大会」の射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年7月27日</span>
                <span className="block flex-1">「三県対抗戦」の射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年6月1日</span>
                <span className="block flex-1">「大会関係」に国体最終予選結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年5月24日</span>
                <span className="block flex-1">「大会関係」の国体最終予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年5月14日</span>
                <span className="block flex-1">「大会関係」の国体最終予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年5月13日</span>
                <span className="block flex-1">「大会関係」の国体最終予選射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年5月13日</span>
                <span className="block flex-1">「大会関係」に国体最終予選射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月28日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月22日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月20日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月18日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＳＢ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月13日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ・ＤＰ結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月11日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ・ＤＰ射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月6日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ・ＤＰ射座割修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年4月4日</span>
                <span className="block flex-1">「大会関係」に国体一次予選ＡＰ・ＡＲＳ・ＤＰ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2014年2月28日</span>
                <span className="block flex-1">
                  「事業計画」に２６年度の事業計画(案)を発表
                  <br />
                  「お知らせ」更新
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年10月11日</span>
                <span className="block flex-1">神奈川県選手権大会の射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年10月9日</span>
                <span className="block flex-1">トップに神奈川県選手権大会の射座割を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年10月6日</span>
                <span className="block flex-1">トップに全関東ＡＰ／ＨＲ／マスターズライフル射撃大会の要項を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年9月9日</span>
                <span className="block flex-1">「大会関係」に全関東大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年8月11日</span>
                <span className="block flex-1">トップに関東ブロック・全関東大会射座割一部修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年8月9日</span>
                <span className="block flex-1">トップに関東ブロック・全関東大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年8月8日</span>
                <span className="block flex-1">「大会関係」に三県対抗選手権大会結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年8月1日</span>
                <span className="block flex-1">トップに三県対抗選手権大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年7月17日</span>
                <span className="block flex-1">「大会関係」に伊勢原射撃場開場記念大会結果</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年7月9日</span>
                <span className="block flex-1">トップに伊勢原射撃場開場記念大会射座割</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年6月29日</span>
                <span className="block flex-1">トップに伊勢原射撃場開場記念大会と関東ブロック大会の実施要項</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年5月20日</span>
                <span className="block flex-1">「大会関係」に１９日の国体最終予選兼全関東選手権予選結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年5月16日</span>
                <span className="block flex-1">「大会関係」に春期ナショナルチーム選手選考会の結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年5月15日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＳＢ／ＢＲＳ４０ＪＷ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年5月3日</span>
                <span className="block flex-1">トップページにお知らせを追加</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年4月29日</span>
                <span className="block flex-1">「大会関係」に国体１次予選兼東日本選手権予選エアー結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年4月27日</span>
                <span className="block flex-1">「大会関係」に国体１次予選兼東日本選手権予選エアー射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年4月17日</span>
                <span className="block flex-1">「大会関係」に国体１次予選兼東日本選手権予選結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2013年3月29日</span>
                <span className="block flex-1">「事業計画」に２５年度の事業計画を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年12月19日</span>
                <span className="block flex-1">「大会関係」に全関東マスターズ・ＡＰ／ＨＲ射撃競技大会結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年11月24日</span>
                <span className="block flex-1">「大会関係」に県ライフル射撃選手権大会ＡＲ・ＡＰ結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年11月17日</span>
                <span className="block flex-1">「大会関係」に全関東マスターズ・ＡＰ／ＨＲ射撃競技大会座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年11月12日</span>
                <span className="block flex-1">「大会関係」に県ライフル射撃選手権大会ＡＲ・ＡＰ射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年10月27日</span>
                <span className="block flex-1">「大会関係」に県ライフル射撃選手権大会SB結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年10月17日</span>
                <span className="block flex-1">「大会関係」に県ライフル射撃選手権大会SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 6月9日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月22日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月20日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR/BP結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月18日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月14日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR/BP結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 5月 5日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AP/BR・SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月22日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AR/BP結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月18日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AR射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月16日</span>
                <span className="block flex-1">「大会関係」に国体一次予選SB結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月14日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AP/BR結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月9日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AP/BR・SB射座割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年 4月7日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AP/BR・SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年3月26日</span>
                <span className="block flex-1">「推薦関係」の各種推薦手続きについてを更新</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年3月26日</span>
                <span className="block flex-1">「リンク」に義援金にご協力頂いたBEACH.BUM様を追加</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年3月21日</span>
                <span className="block flex-1">トップページに義援金のお礼</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2012年2月28日</span>
                <span className="block flex-1">「事業計画」に２４年度の事業計画を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年11月19日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会の結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年11月5日</span>
                <span className="block flex-1">「推薦関係」にAP所持中の皆様宛ブレッテンNo. 51のリンクを追加</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年11月1日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会の結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年10月30日</span>
                <span className="block flex-1">「大会関係」に神奈川県選手権大会の射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 10月6日</span>
                <span className="block flex-1">
                  「トップページ」に全関東ＡＰ／ＨＲ大会及び全関東マスターズ大会の要項を記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 9月19日</span>
                <span className="block flex-1">
                  「トップページ」に１０月の横須賀市ライフル射撃協会大口径大会の日付変更を記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 8月13日</span>
                <span className="block flex-1">「トップページ」に三県大口径大会の要項へのリンク記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 6月18日</span>
                <span className="block flex-1">義援金の受領書を掲載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 6月7日</span>
                <span className="block flex-1">
                  「大会関係」に国体最終予選AR/BRA/BP結果発表
                  <br />
                  トップペ－ジに第４１回東日本ライフル射撃選手権大会について記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月26日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR/BRA/BP射座割一部修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月24日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AR/BRA/BP射座割一部修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月22日</span>
                <span className="block flex-1">
                  「大会関係」に国体最終予選AP結果発表
                  <br />
                  国体一次予選AR/BP結果発表
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月20日</span>
                <span className="block flex-1">「大会関係」に国体最終予選AP射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月12日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB射座割一部修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 5月 9日</span>
                <span className="block flex-1">「大会関係」に国体最終予選SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 4月18日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AP/BR・SB結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 4月11日</span>
                <span className="block flex-1">「大会関係」に国体一次予選AP/BR・SB射座割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2011年 4月 1日</span>
                <span className="block flex-1">
                  「推薦関係」の各種推薦手続きについてを２３年度版に更新
                  <br />
                  「事業計画」に２３年度事業計画を記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 12月26日</span>
                <span className="block flex-1">「推薦関係」にＡＰを所持中の方々へを記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 11月14日</span>
                <span className="block flex-1">「大会関係」に県選手権大会(AR・AP)の結果を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 11月13日</span>
                <span className="block flex-1">
                  「大会関係」に県選手権大会(AR・AP)の射座割に間違いがありましたので修正しました
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 11月12日</span>
                <span className="block flex-1">「大会関係」に県選手権大会(AR・AP)の射座割を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 10月23日</span>
                <span className="block flex-1">
                  「トップページ」に朝霞射撃場休場延長についてを記載
                  <br />
                </span>
                <span className="block flex-1">「大会関係」に県選手権大会の結果を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 10月 9日</span>
                <span className="block flex-1">「トップページ」に３県大口径の案内を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 8月 2日</span>
                <span className="block flex-1">「推薦関係」に推薦書類変更の旨記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 6月12日</span>
                <span className="block flex-1">「トップページ」に東日本選手権の射座割について記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 5月22日</span>
                <span className="block flex-1">「トップページ」に全日本社会人大会の締め切り記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 4月25日</span>
                <span className="block flex-1">「大会関係」に国体一次予選結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 4月11日</span>
                <span className="block flex-1">「入会案内」の事務局を変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 4月2日</span>
                <span className="block flex-1">第２回全関東大口径ライフル射撃選手権大会中止を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年 3月6日</span>
                <span className="block flex-1">「事業計画」に２２年度事業計画を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年2月26日</span>
                <span className="block flex-1">「推薦関係」の各種推薦受付日を修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年1月31日</span>
                <span className="block flex-1">「推薦関係」の各種推薦受付日を２２年度に更新</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2010年1月16日</span>
                <span className="block flex-1">「お知らせ」に年会費納入に関するお知らせ記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年10月25日</span>
                <span className="block flex-1">「大会関係」に県選手権兼普及大会（ＳＢ）結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年10月16日</span>
                <span className="block flex-1">トップページに改正銃刀法に付いてのリンクを追加</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 9月12日</span>
                <span className="block flex-1">「ご挨拶」に会長辞任のご挨拶</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 6月14日</span>
                <span className="block flex-1">「推薦関係」の適格者証明について申請書類追加</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 6月11日</span>
                <span className="block flex-1">関ブロ全関東大会の要項をTOPページにからリンク</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月24日</span>
                <span className="block flex-1">全関東大口径大会の射座割りを頂いたのでTOPページにからリンク</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月24日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（ＡＲ）結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月17日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（ＡＰ・ＢＲ）結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月15日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（ＡＰ・ＢＲ）射群割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月 4日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（SB）結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月 2日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（ＳＢ）射群割一部修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月 1日</span>
                <span className="block flex-1">「大会関係」に国体最終予選（ＳＢ）射群割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 5月 1日</span>
                <span className="block flex-1">「大会関係」に国体一次予選（ＡR）結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月25日</span>
                <span className="block flex-1">
                  「大会関係」に国体一次予選（ＡＰ・ＢＲ）結果発表
                  <br />
                  「お知らせ」にライフル銃に関する講習会記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月24日</span>
                <span className="block flex-1">「大会関係」に国体一次予選（ＡＲ）射群割日付修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月23日</span>
                <span className="block flex-1">「大会関係」に国体一次予選（ＡＰ・ＢＰ／ＡＲ）射群割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月22日</span>
                <span className="block flex-1">
                  「大会関係」国体一次予選（ＳＢ）結果発表
                  <br />
                  「大会関係」に関東大口径大会要綱を記載
                  <br />
                  「メインページ」に春期ピストル大会参加者の皆様へを記載
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月21日</span>
                <span className="block flex-1">「推薦関係」に適格者証明書類をＤＬ可能にリンク</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月16日</span>
                <span className="block flex-1">「大会関係」の国体一次予選（ＳＢ）射群割一部変更</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月14日</span>
                <span className="block flex-1">「大会関係」に国体一次予選（ＳＢ）射群割発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 4月 8日</span>
                <span className="block flex-1">「推薦関係」に適格者証明についてを追加 &lt;=重要です</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 3月18日</span>
                <span className="block flex-1">「推薦関係」項目追加 &lt;=重要です</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 3月12日</span>
                <span className="block flex-1">「事業計画」に２１年度事業計画を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2009年 3月 8日</span>
                <span className="block flex-1">「大会関係」にＳＢ普及大会の結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 11月 16日</span>
                <span className="block flex-1">「大会関係」に三県大口径大会の結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 10月 26日</span>
                <span className="block flex-1">「大会関係」に県選手権ＡＲ大会の結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 10月 19日</span>
                <span className="block flex-1">「大会関係」に県選手権ＳＢ大会の結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 9月 7日</span>
                <span className="block flex-1">「大会関係」にＡＲ秋季普及大会の結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 8月10日</span>
                <span className="block flex-1">「大会関係」に松田選手のオリンピック結果を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 7月29日</span>
                <span className="block flex-1">「大会関係」に全関東ライフル射撃競技会の日程と参加者を発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 7月24日</span>
                <span className="block flex-1">
                  「大会関係」の大会申し込み先（事務局）を変更
                  <br />
                  「入会案内」の事務局を変更
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 7月 2日</span>
                <span className="block flex-1">「大会関係」に全関東大会の要項を記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 6月14日</span>
                <span className="block flex-1">
                  「事業計画」の全日本社会人ライフル射撃競技選手権大会申し込み締め切り日を修正
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 6月11日</span>
                <span className="block flex-1">「大会関係」に東日本出場選手発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月25日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＡＲの結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月24日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＡＲの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月18日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＡＰ・ＢＲの結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月15日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＡＰ・ＢＲの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月10日</span>
                <span className="block flex-1">
                  「大会関係」の国体最終予選ＳＢＰ６０で１２位から１８位までが表示されていなかったのを修正
                  <br />
                  申し訳ありませんでした
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月 4日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＳＢの結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 5月 1日</span>
                <span className="block flex-1">「大会関係」に国体最終予選ＳＢの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月27日</span>
                <span className="block flex-1">
                  「お知らせ」に火薬類取締法の運用変更について追加を記載
                  <br />
                  「大会関係」に国体１次予選ＡＲの結果を発表
                </span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月23日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＡＲの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月20日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＡＰ・ＢＲの結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月17日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＡＰ・ＢＲの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月13日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＳＢの結果発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月11日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＳＢの射座割りを修正</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月10日</span>
                <span className="block flex-1">「大会関係」に国体１次予選ＳＢの射座割りを発表</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月 7日</span>
                <span className="block flex-1">「お知らせ」に火薬類取締法の運用変更についてを記載</span>
              </li>
              <li className="flex">
                <span className="w-32 block">2008年 4月 1日</span>
                <span className="block flex-1">ＮＰＯ法人神奈川県ライフル射撃協会ＨＰとして更新</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'お知らせ'} />
          <CardContent>
            <Stack spacing={2}>
              <p>
                <strong>新型コロナウィルス感染症対策として直前での大会中止もあり得る</strong>
              </p>
              <p>以下の事項に該当する場合は、自主的に参加を見合わせること</p>
              <ul className="ml-4 list-decimal pl-2 list-inside">
                <li>体調がよくない場合（例：発熱・咳・咽頭痛などの症状がある場合）</li>
                <li>同居家族や身近な知人に感染が疑われる方がいる場合</li>
                <li>
                  過去14日以内に政府から入国制限、入国後の観察期間を必要とされている国、地域等への渡航又は当該在住者との濃厚接触がある場合
                </li>
                <li>
                  競技を行っていない際にはマスクを着用すること(競技中であっても役員やコーチと会話する場合はマスクを着用する事）
                </li>
                <li>競技会場では、こまめな手洗いをすること</li>
                <li>銃を共有する場合は感染防止のため消毒を徹底すること</li>
                <li>感染防止のために主催者が決めたその他の措置の遵守、主催者の指示に従うこと</li>
              </ul>
              <p>
                ※開催できなかった国体予選参加料の返金を行っております。
                <br />
                該当される方はお手数をおかけして申しわけありませんが、
                <br />
                返金振り込み先をお知らせ下さい。
              </p>
              <p>
                最近大会参加等で締め切り後に申し込みをされる方がおられます。
                <br />
                事務処理が滞る原因になってしまいますのでくれぐれも締め切りは厳守でお願いいたします。
              </p>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardActionArea component={Link} href="https://www.tnp-tokio.co.jp/hunter/" target="_blank">
            <CardMedia component="img" height="164" image="/static/index/hunter_banner.png" alt="ハンター保険" />
          </CardActionArea>
        </Card>
      </MainBody>
    </>
  );
}

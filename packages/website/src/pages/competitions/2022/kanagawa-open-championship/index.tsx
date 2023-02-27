import Card from '@kanagawa-rifle/website/components/Card';
import Button from '@kanagawa-rifle/website/components/Button';
import CardActions from '@kanagawa-rifle/website/components/CardActions';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import List from '@kanagawa-rifle/website/components/List';
import ListItem from '@kanagawa-rifle/website/components/ListItem';
import Divider from '@kanagawa-rifle/website/components/Divider';
import ListItemText from '@kanagawa-rifle/website/components/ListItemText';
import Stack from '@kanagawa-rifle/website/components/Stack';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="2022年度 神奈川オープン兼神奈川県ライフル射撃競技選手権大会" />

      <MainBody>
        <h2 className="text-center text-xl">
          <span className="text-sm">2022年度 (令和4年度)</span>
          <br />
          神奈川オープン兼神奈川県ライフル射撃競技選手権大会
        </h2>

        <div className="text-center text-base">最終更新日: 2022年10月20日</div>

        <Card>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold">11月6日 (日)</div>
              <div className="text-lg font-bold">神奈川県立伊勢原射撃場</div>
              <div className="text-sm">申込：～10月21日 (金)</div>
              <div className="text-sm">
                インテグリティ講習、
                <br />
                ライフル射撃に関する講習開催
                <br />
                (大会終了後)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'要項・射座割'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/details/">実施要項</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://forms.gle/bVxJWdBScvvguwbb8" target="_blank" rel="noreferrer">
                  申込フォーム
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/start-lists/">射座割</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/results/">競技結果</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'様式'} />
          <CardContent>※大会と各種講習会については, 申込フォームからもお申し込みいただけます。</CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/application.xls">大会参加申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/integrity-course.docx">
                  インテグリティ講習受講申込書
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/competitions/2022/kanagawa-open-championship/rifle-course.docx">
                  ライフル射撃に関する講習会受講申込書
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

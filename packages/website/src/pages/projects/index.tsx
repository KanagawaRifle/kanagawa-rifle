import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import Link from '@kanagawa-rifle/website/components/Link';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';
import List from '@kanagawa-rifle/website/components/List';
import ListItem from '@kanagawa-rifle/website/components/ListItem';
import ListItemText from '@kanagawa-rifle/website/components/ListItemText';
import Divider from '@kanagawa-rifle/website/components/Divider';

export default function Page() {
  return (
    <>
      <Meta title="事業計画" />

      <MainBody>
        <h2 className="text-center text-xl">事業計画</h2>

        <Card>
          <CardHeader title={'令和5年度'} />
          <CardContent>
            国体予選お申込みフォームは, 一次予選については3月7日 (火) ごろ, 最終予選については4月5日 (水)
            ごろ公開の予定です。
          </CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2023/schedule.pdf">事業計画案</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2023/notification.pdf">会員の皆様へのお知らせ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2023/membership.pdf">年会費一覧</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和4年度'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2022/schedule.xls">事業計画</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和3年度'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/R03yotei0420.xls">事業計画</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/R03yoteiura.doc">特記事項</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/R03oshirase.doc">会員の皆様へのお知らせ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
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

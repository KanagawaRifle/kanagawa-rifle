import Card from '@kanagawa-rifle/website/components/Card';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Divider from '@kanagawa-rifle/website/components/Divider';
import Link from '@kanagawa-rifle/website/components/Link';
import List from '@kanagawa-rifle/website/components/List';
import ListItem from '@kanagawa-rifle/website/components/ListItem';
import ListItemText from '@kanagawa-rifle/website/components/ListItemText';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="事業計画" />

      <MainBody>
        <h2 className="text-center text-xl">事業計画</h2>

        <Card>
          <CardHeader title={'令和7年度'} subheader={'2025'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="https://static.kanagawa-rifle.org/website/projects/2025/schedule.pdf">事業計画（案）</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://static.kanagawa-rifle.org/website/projects/2025/competitions.pdf">主催大会および推薦申請のご案内</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://static.kanagawa-rifle.org/website/projects/2025/membership.pdf">会員資格更新のご案内</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://static.kanagawa-rifle.org/website/projects/2025/entry-fee.pdf">令和7年度からの変更点について</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://static.kanagawa-rifle.org/website/projects/2025/entry-fee.pdf">参加料の改定について</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和6年度'} subheader={'2024'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2024/schedule.pdf?v=1707978030">令和6年度事業計画案</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2024/competitions.pdf?v=1707978030">令和6年度主催大会および推薦申請のご案内</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2024/membership.pdf">会員資格更新のご案内</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和5年度'} subheader={'2023'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/static/projects/2023/schedule.pdf">事業計画</Link>
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
          <CardHeader title={'令和4年度'} subheader={'2022'} />
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

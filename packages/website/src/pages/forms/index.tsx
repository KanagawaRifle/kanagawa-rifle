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
      <Meta title="様式" />

      <MainBody>
        <h2 className="text-center text-xl">様式</h2>

        <Card>
          <CardHeader title={'ダウンロード'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link href="/static/forms/competition.xlsx">日ラ・神ラ大会申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/forms/membership.xlsx">入会申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/forms/dankyu.docx">段級審査受験申請書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/forms/integrity-course.docx">インテグリティ講習会受講申込書</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/forms/rifle-course.docx">ライフル射撃に関する講習会受講申込書</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

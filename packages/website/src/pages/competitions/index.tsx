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
import Stack from '@kanagawa-rifle/website/components/Stack';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
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
          <CardHeader title={'参加料 (神奈川県ライフル射撃協会主催大会)'} />
          <List dense={true}>
            <ListItem>
              <ListItemText>50m SB3×20: 7,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>50m SB60PR: 7,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AR60S: 3,000円 (高校生以下: 2,500円)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AP60: 4,500円 (高校生以下: 4,000円)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m BR60S/BP60: 2,500円 (高校生以下: 1,000円)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m HR40 M/W: 4,000円</ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和6年度'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>2024年10月27日@
            <Link href="http://www.isehara-shooting.jp/index.html" target="_blank">
              神奈川県立伊勢原射撃場
            </Link>
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>申込期限: 10月9日 (水)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://forms.gle/4dFcKUeg7biuJU4X9" target="_blank">お申込みフォーム</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和6年度'} title={'国スポ最終予選兼全関東予選会'} />
          <CardContent>2024年5月26日@
            <Link href="http://www.isehara-shooting.jp/index.html" target="_blank">
              神奈川県立伊勢原射撃場
            </Link>
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>申込期限: 5月8日 (水)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://forms.gle/wyz4gNqjgZ4TCEnA8" target="_blank">お申込みフォーム</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和6年度'} title={'国スポ一次予選兼東日本予選会'} />
          <CardContent>2024年4月21日@
            <Link href="http://www.isehara-shooting.jp/index.html" target="_blank">
              神奈川県立伊勢原射撃場
            </Link>
          </CardContent>
          <CardContent>
            ※ 国スポ (予選を含む) 参加者は参加料に国スポ予選登録料 (国スポ保健料) 1,500円を加算してお振り込みください
            (一次予選申し込み時のみ)。
            <br />
            ※ハンドライフルは普及大会となります。
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>申込期限: 4月3日 (水)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://forms.gle/eG5aBZjHiGWYzLcaA" target="_blank">お申込みフォーム</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <h2 className="text-center text-lg">2023年度 (令和5年度)</h2>

        <Card>
          <CardHeader subheader={'令和5年度'} title={'神奈川県ジュニアライフル射撃競技選手権大会'} subheaderTypographyProps={{ color: '#fff' }} />
          <CardContent>2024年2月24日 (土) ― 2月25日 (日)</CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf">
                  競技結果 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2024-02-24-kanagawa-junior-championship-details.pdf">
                  実施要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和5年度'} title={'栃木県ライフル射撃競技大会 (100m SB 大会)'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-12-10-tochigi-22lr-100m.pdf">
                  実施要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和5年度'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>
            <Stack spacing={2}>
              <p>
                2023年11月5日 (日) @
                <Link href="http://www.isehara-shooting.jp/index.html" target="_blank">
                  神奈川県立伊勢原射撃場
                </Link>
              </p>
            </Stack>
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf">
                  実施要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-results.pdf">
                  競技結果 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'第60回全関東ライフル射撃競技選手権大会'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf">射座割表 [PDF]</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-08-18-zen-kanto-details.pdf">実施要項 [PDF]</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和5年度'} title={'国体最終予選兼全関東予選会'} />
          <CardContent>2023年5月21日@神奈川県立伊勢原射撃場</CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-05-21-kokutai-trials-2nd-start-lists.pdf">
                  射座割表 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-05-21-kokutai-trials-2nd-results.pdf">競技結果 [PDF]</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和5年度'} title={'国体一次予選兼東日本予選会'} />
          <CardContent>2023年4月23日@神奈川県立伊勢原射撃場</CardContent>
          <CardContent>
            ※ 国体 (予選を含む) 参加者は参加料に国体予選登録料 (国体保健料) 1,500円を加算してお振り込みください
            (一次予選申し込み時のみ)。
            <br />
            ※ハンドライフルは普及大会となります。
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-04-23-kokutai-trials-1st-start-lists.pdf">
                  射座割表 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-04-23-kokutai-trials-1st-results.pdf">競技結果 [PDF]</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <h2 className="text-center text-lg">2022年度 (令和4年度)</h2>

        <Card>
          <CardHeader subheader={'令和4年度'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>2022年11月6日@神奈川県立伊勢原射撃場</CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-details.pdf">
                  実施要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-results.pdf">
                  競技結果 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和4年度'} title={'国体最終予選兼全関東予選会'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-05-22-kokutai-trials-2nd-results.pdf">競技結果 [PDF]</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader subheader={'令和4年度'} title={'国体一次予選兼東日本予選会'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-04-24-kokutai-trials-1st-results.pdf">競技結果 [PDF]</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

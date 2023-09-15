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
          <CardHeader title={'令和5年度神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>
            <Stack spacing={2}>
              <p>
                2023年11月5日 (日) @
                <Link href="http://www.isehara-shooting.jp/index.html" target="_blank">
                  神奈川県立伊勢原射撃場
                </Link>
              </p>
              <p>申込期限: 10月18日 (水) 23時59分まで</p>
            </Stack>
          </CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf">
                  大会要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="https://forms.gle/UGncTaqC4LaFRpxo9" target="_blank">
                  お申込みフォーム
                </Link>{' '}
                (
                <Link
                  href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS55jUXMDOY2pnK497KxtqQljW4MyyEsLBpXIHAYySq7_9rlbv5_nsgBmAiZvOXO3Yw9leZTLcCXbGO/pubhtml"
                  target="_blank"
                >
                  受付名簿
                </Link>
                )
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>射座割表 [PDF]</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>競技結果 [PDF]</ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'第60回全関東ライフル射撃競技選手権大会'} />
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-08-18-zen-kanto-details-start-lists.xlsx">射座割表</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2023/2023-08-18-zen-kanto-details.pdf">大会要項</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和5年度国体最終予選兼全関東予選会'} />
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
          <CardHeader title={'令和5年度国体一次予選兼東日本予選会'} />
          <CardContent>2023年4月23日@神奈川県立伊勢原射撃場</CardContent>
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

        <h2 className="text-center text-lg">2022年度</h2>

        <Card>
          <CardHeader title={'令和4年度神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>2022年11月6日@神奈川県立伊勢原射撃場</CardContent>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-details.pdf">
                  大会実施要項 [PDF]
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/static/competitions/2022/2022-11-06-kanagawa-open-championship-start-lists.pdf">
                  射座割表 [PDF]
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
          <CardHeader title={'参加料 (神奈川県ライフル射撃協会主催大会)'} />
          <CardContent>
            ※ 国体 (予選を含む) 参加者は参加料に国体予選登録料 (国体保健料) 1,500円を加算してお振り込みください
            (一次予選申し込み時のみ)。
            <br />
            ※ハンドライフルは普及大会となります。
          </CardContent>
          <List dense={true}>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>50m 3×20 M/W: 7,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>50m 60PR M/W: 7,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AR60 M/W: 3,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AP60 M/W: 4,500円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AR60 MJ/WJ: 2,500円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m AP60 MJ/WJ: 4,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m BR/BP M/W: 2,500円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m BR/BP MJ/WJ: 1,000円</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>10m HR40 M/W: 4,000円</ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和4年度 国体最終予選'} />
          <List dense={true}>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_BP60M.pdf">２０２２年度　国体最終予選　ＢＰ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_BP60W.pdf">２０２２年度　国体最終予選　ＢＰ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_AP60M.pdf">２０２２年度　国体最終予選　ＡＰ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_AP60W.pdf">２０２２年度　国体最終予選　ＡＰ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_BRS60MJ.pdf">２０２２年度　国体最終予選　ＢＲＳ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_BRS60WJ.pdf">２０２２年度　国体最終予選　ＢＲＳ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_ARS60MJ.pdf">２０２２年度　国体最終予選　ＡＲＳ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_ARS60M.pdf">２０２２年度　国体最終予選　ＡＲＳ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_ARS60WJ.pdf">２０２２年度　国体最終予選　ＡＲＳ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_ARS60W.pdf">２０２２年度　国体最終予選　ＡＲＳ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_P60M.pdf">２０２２年度　国体最終予選　５０ｍＰ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_P60W.pdf">２０２２年度　国体最終予選　５０ｍＰ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_3x40M.pdf">２０２２年度　国体最終予選　５０ｍ３ｘ４０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220522_3x40W.pdf">２０２２年度　国体最終予選　５０ｍ３ｘ４０Ｗ</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和4年度 国体最一次予選'} />
          <List dense={true}>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424BP60M.pdf">２０２２年度　国体１次予選　ＢＰ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424BP60W.pdf">２０２２年度　国体１次予選　ＢＰ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424AP60M.pdf">２０２２年度　国体１次予選　ＡＰ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424AP60W.pdf">２０２２年度　国体１次予選　ＡＰ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424BRS60MJ.pdf">２０２２年度　国体１次予選　ＢＲＳ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424BRS60WJ.pdf">２０２２年度　国体１次予選　ＢＲＳ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424ARS60MJ.pdf">２０２２年度　国体１次予選　ＡＲＳ６０ＭＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424ARS60M.pdf">２０２２年度　国体１次予選　ＡＲＳ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424ARS60WJ.pdf">２０２２年度　国体１次予選　ＡＲＳ６０ＷＪ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424ARS60W.pdf">２０２２年度　国体１次予選　ＡＲＳ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424_50mP60M.pdf">２０２２年度　国体１次予選　５０ｍＰ６０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424_50mP60W.pdf">２０２２年度　国体１次予選　５０ｍＰ６０Ｗ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424_50m3x40M.pdf">２０２２年度　国体１次予選　５０ｍ３ｘ４０Ｍ</Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link href="/20220424_50m3x40W.pdf">２０２２年度　国体１次予選　５０ｍ３ｘ４０Ｗ</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

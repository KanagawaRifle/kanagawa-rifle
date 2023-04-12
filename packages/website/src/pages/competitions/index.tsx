import Alert from '@kanagawa-rifle/website/components/Alert';
import AlertTitle from '@kanagawa-rifle/website/components/AlertTitle';
import Button from '@kanagawa-rifle/website/components/Button';
import Card from '@kanagawa-rifle/website/components/Card';
import CardActions from '@kanagawa-rifle/website/components/CardActions';
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

        <Alert severity="warning">
          <AlertTitle>国体一次・最終予選の50m三姿勢種目について</AlertTitle>
          国体一次予選及び国体最終予選の三姿勢種目については男女ともに 50m3×20
          で実施いたします。参加料を振り込まれる際はお間違いのないようお願いいたします。
        </Alert>

        <Card>
          <CardHeader title={'令和5年度国体一次予選 兼 東日本予選会'} />
          <List>
            <ListItem>
              <ListItemText>期日: 2023年4月23日 (日)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>申込期限: 2023年3月7日 (火) ～2023年4月7日 (金)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                お申込み:{' '}
                <Link target="_blank" href="https://forms.gle/aPDB26AKoUYnf8GcA">
                  https://forms.gle/aPDB26AKoUYnf8GcA
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                名簿:{' '}
                <Link
                  target="_blank"
                  href="https://docs.google.com/spreadsheets/d/1_rSc4JzKFR937xE84EImACRkx4mTEXYJRFnWsUSLUx8/edit?usp=share_link"
                >
                  受付名簿
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>会場: 神奈川県立伊勢原射撃場</ListItemText>
            </ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'令和5年度国体最終予選 兼 全関東予選会'} />
          <List>
            <ListItem>
              <ListItemText>期日: 2023年5月21日 (日)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>申込期限: 2023年4月5日 (水) ～2023年5月5日 (金)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                お申込み:{' '}
                <Link target="_blank" href="https://forms.gle/WxkFnRye5T2G1Djr7">
                  https://forms.gle/WxkFnRye5T2G1Djr7
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                名簿:{' '}
                <Link
                  target="_blank"
                  href="https://docs.google.com/spreadsheets/d/1OkVY2toStzF1tfUCxwDytRQ5kkPlGhravMH4a9vW9Ok/edit?usp=sharing"
                >
                  受付名簿
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>会場: 神奈川県立伊勢原射撃場</ListItemText>
            </ListItem>
          </List>
        </Card>

        <h2 className="text-center text-lg">2022年度</h2>

        <Card>
          <CardHeader
            title={'神奈川オープン兼県ライフル射撃競技選手権大会'}
            subheader={<span className="text-white">2022年11月6日 (日) 開催</span>}
          />
          <List>
            <ListItem>
              <ListItemText>期日: 2022年11月6日 (日)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>申込期限: ～2022年10月21日 (金)</ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>会場: 神奈川県立伊勢原射撃場</ListItemText>
            </ListItem>
          </List>
          <CardActions>
            <Button component={Link} href="/competitions/2022/kanagawa-open-championship/">
              大会詳細ページ
            </Button>
          </CardActions>
        </Card>

        <Card>
          <CardHeader title={'参加料 (神奈川県ライフル射撃協会主催大会)'} />
          <CardContent>
            <Stack spacing={2}>
              <p>
                日本ライフル射撃協会が、4月からの大会・種目ごとに参加登録料を徴収することになりました。
                <br />
                これにより各個人の情報が日ラネットに登録・更新され推薦等の情報やランキングに使用されるとのことです。
                <br />
                グレードによって登録料が異なったり高校生以下はかからないなどと複雑なため、神奈川県ライフル射撃協会では以下のように大会参加料を改訂いたします(登録料込みの値段になります)
              </p>
              <ul className="list-disc list-outside pl-6">
                <li>50m3×40Ｍ／Ｗ ：10,500円</li>
                <li>50m3×20Ｍ／Ｗ ： 7,000円</li>
                <li>50mP60M／W ： 7,000円</li>
                <li>ARS・P60M／W ： 3,000円</li>
                <li>AP60M／W ： 4,500円</li>
                <li>ARS・P60MJ／WJ ： 2,500円</li>
                <li>AP60MJ／WJ ： 4,000円</li>
                <li>BR・BP ： 2,500円</li>
                <li>BR・BPMJ／WJ ： 2,000円</li>
                <li>HR40M／W ： 4,000円</li>
              </ul>
              <p>
                ※ 国体 (予選を含む) 参加者は参加料に国体予選登録料 (国体保健料) 1,500円を加算してお振り込みください
                (一次予選申し込み時のみ)。
                <br />
                ※ハンドライフルは普及大会となります。
              </p>
            </Stack>
          </CardContent>
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

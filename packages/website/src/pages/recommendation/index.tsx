import Alert from '@kanagawa-rifle/website/components/Alert';
import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Divider from "@kanagawa-rifle/website/components/Divider";
import Link from '@kanagawa-rifle/website/components/Link';
import List from "@kanagawa-rifle/website/components/List";
import ListItem from "@kanagawa-rifle/website/components/ListItem";
import ListItemText from "@kanagawa-rifle/website/components/ListItemText";
import Stack from '@kanagawa-rifle/website/components/Stack';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="推薦関係" />

      <MainBody>
        <h2 className="text-center text-xl">推薦関係</h2>

        <Alert severity="info">
          <strong>2022年4月より推薦申請の方法が変更されております。</strong>
          今までは各個人で作成した書類を県の推薦担当に郵送していただいておりましたが、今後はウェブ (日ラネット)
          上にて行うようになります。
        </Alert>

        <Card>
          <CardHeader title={'手数料'} />
          <CardContent>
            推薦に係る手数料は<Link href="/about">当協会の指定口座</Link>までお振込みください。
          </CardContent>
          <List dense={true}>
            <ListItem><ListItemText>ライフル銃 (小口径) 推薦: 6,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>ライフル銃 (大口径) 推薦: 10,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>けん銃推薦: 10,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>空気けん銃推薦: 6,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>低年者ライフル銃 (小口径) 推薦: 6,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>技能講習免除: 6,000円</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>再発行: 2,000円</ListItemText></ListItem>
          </List>
        </Card>

        <Card>
          <CardHeader title={'推薦スケジュール'} />
          <CardContent>
            県ラの推薦申込締切日は下記の通りです。締切日以降に届いたものは翌月の推薦委員会への申請となります。
          </CardContent>
          <List dense={true}>
            <ListItem><ListItemText>4月13日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>5月11日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>6月15日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>7月13日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>8月10日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>9月14日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>10月12日 (木)</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>11月16日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>12月7日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>令和6年1月11日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText>令和6年2月15日（木）</ListItemText></ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem><ListItemText><strong>3月の推薦委員会はありません</strong></ListItemText></ListItem>
          </List>
          <CardContent>
            推薦書は申請者に届くまでに県ラ締切後1ヶ月弱かかります。特にピストル所持者は所持銃の許可有効期間をよく確認の上、余裕を持って計画的にご申請ください。
            <br />
            ※令和４年度は推薦委員会がない月ありますのでご申請される方はご注意ください。
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'技能講習免除について'} />
          <CardContent>
            技能講習免除に関しても県ラ締切後１ヶ月弱かかりますので、余裕を持って申請するようにしてください。
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'ウェブ申請の流れ'} />
          <CardContent>
            <Stack spacing={2}>
              <ol className="list-decimal list-outside pl-6">
                <li>
                  <Link href="https://members.riflesports.jp/_login.cgi?top+1+++" target="_blank">
                    日ラのシステム
                  </Link>
                  にユーザー登録を行う。（各個人にて行う：日ラＩＤ・連絡用メールアドレスが必要）
                  <br />
                  ※重要・必須：現在日ラの持っている個人情報が表示されるので最新情報へ更新する
                  <br />
                  （住所の都道府県や職業など推薦書に書かれる項目もある為）
                </li>
                <li>日ラＷｅｂ上から該当推薦のページで必要事項を入力・申請</li>
                <li>各県の推薦担当による承認（神奈川は推薦締切日に処理）</li>
                <li>日ラの推薦委員会による承認</li>
                <li>推薦書発行（今まで通り）</li>
                <li>各県の推薦担当が個別に郵送（今まで通り）</li>
              </ol>
              <ul className="list-disc list-outside pl-6">
                <li>※ ２回目以降は２）から行う</li>
                <li>※ 条件を満たしていない推薦は申請できない形になる予定</li>
                <li>※ 推薦申請料の支払いは今まで通り</li>
              </ul>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <dl>
                <dt className="font-bold">（質問）</dt>
                <dd>
                  個人でＷｅｂ上から行えない場合（アクセスする端末を持っていない・そもそもＷｅｂ自体が分からない）
                </dd>
                <dt className="font-bold pt-2">（日ラの回答）</dt>
                <dd>
                  家族や個人情報を見られても良い友人知人に依頼してほしい。
                  <br />
                  最悪各県の推薦担当者に依頼する。（個人情報は申請書に記載されている内容なので担当者はもともと確認している為）
                  <br />
                  それ用の申請用紙フォーマット作成予定
                </dd>
              </dl>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'AP を所持中の皆様へ'} />
          <CardContent>※ご不明な点は日ラへ直接お問い合わせください。</CardContent>
          <List dense={true}>
            <ListItem>
              <ListItemText>
                <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_56.pdf">
                  推薦ブレッテン no.56
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_55.pdf">
                  推薦ブレッテン no.55
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_51.pdf">
                  推薦ブレッテン no.51
                </Link>
              </ListItemText>
            </ListItem>
            <Divider component="li" className="border-gray-400" />
            <ListItem>
              <ListItemText>
                <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_49.pdf">
                  推薦ブレッテン no.49
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </MainBody>
    </>
  );
}

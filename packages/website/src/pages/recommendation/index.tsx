import Alert from '@kanagawa-rifle/website/components/Alert';
import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Link from '@kanagawa-rifle/website/components/Link';
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
          <CardHeader title={'推薦スケジュール'} />
          <CardContent>
            <Stack spacing={2}>
              <p>
                推薦申請書の県ラ受付は毎月下記の締め切り日とし、それ以降に届いたものは翌月の推薦委員会へ先送りとします。
              </p>
              <ul className="list-disc list-outside pl-6 pt-2">
                <li>4月13日（木）</li>
                <li>5月11日（木）</li>
                <li>6月15日（木）</li>
                <li>7月13日（木）</li>
                <li>8月10日（木）</li>
                <li>9月14日（木）</li>
                <li>10月12日(木)</li>
                <li>11月16日（木）</li>
                <li>12月7日（木）</li>
                <li>令和6年1月11日（木）</li>
                <li>令和6年2月15日（木）</li>
                <li>
                  <strong>3月の推薦委員会はありません</strong>
                </li>
              </ul>
              <p>
                推薦書は申請者に届くまでに県ラ締切後１ヶ月弱かかるため、特にピストル所持者は所持銃の許可有効期間をよく確認の上、余裕を持って計画的に申請してください。
                <br />
                ※令和４年度は推薦委員会が無い月ありますので申請される方はご注意下さい。
              </p>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'技能講習免除について'} />
          <CardContent>
            <Stack spacing={2}>
              <p>技能講習免除に関しても県ラ締切後１ヶ月弱かかりますので、余裕を持って申請するようにしてください。</p>
            </Stack>
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
          <CardContent>
            <Stack spacing={2}>
              <ul className="list-disc list-outside ml-6">
                <li>
                  <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_56.pdf">
                    推薦ブレッテン no.56
                  </Link>
                </li>
                <li>
                  <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_55.pdf">
                    推薦ブレッテン no.55
                  </Link>
                </li>
                <li>
                  <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_51.pdf">
                    推薦ブレッテン no.51
                  </Link>
                </li>
                <li>
                  <Link target="_blank" href="/static/recommendation/Recommendation_Bulletin_no_49.pdf">
                    推薦ブレッテン no.49
                  </Link>
                </li>
              </ul>
              <p>※ご不明な点は日ラへ直接お問い合わせください</p>
            </Stack>
          </CardContent>
        </Card>
      </MainBody>
    </>
  );
}

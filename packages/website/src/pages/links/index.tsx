import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="リンク" />

      <MainBody>
        <h2 className="text-center text-xl">リンク</h2>

        <Card>
          <CardContent>
            <dl className="list-disc list-outside p-2">
              <dt className="mt-2">
                <Link href="https://yokosukarifle.web.fc2.com/" target="_blank">
                  横須賀市ライフル射撃協会
                </Link>
              </dt>
              <dd className="pl-2">エアライフル射撃場が有る横須賀の有名な射撃協会です</dd>
              <dt className="mt-2">
                <Link href="https://www.rs-ennis.com/" target="_blank">
                  ガンショップ エニス
                </Link>
              </dt>
              <dd className="pl-2">ライフル射撃競技に使用する銃および用品を輸入販売している専門店です</dd>
              <dt className="mt-2">
                <Link href="https://www.fareast-gun.co.jp/" target="_blank">
                  ＦＡＲＥＡＳＴ ＧＵＮ ＳＡＬＥＳ
                </Link>
              </dt>
              <dd className="pl-2">有名なガンショップさんです。コラムは一読しておきたいです</dd>
              <dt className="mt-2">
                <Link href="http://www.ginzagun.com/" target="_blank">
                  銀座銃砲店
                </Link>
              </dt>
              <dd className="pl-2">日本で最も長い歴史を持つライフル射撃の専門店です</dd>
              <dt className="mt-2">
                <Link href="http://www.beach-bum.jp/" target="_blank">
                  ＢＥＡＣＨ・ＢＵＭ
                </Link>
              </dt>
              <dd className="pl-2">三戸浜にあるホテル＆レストランです</dd>
              <dt className="mt-2">
                <Link href="https://isehara-shooting.jp/hour.html" target="_blank">
                  伊勢原射撃場
                </Link>
              </dt>
              <dd className="pl-2">ようやく開きました</dd>
            </dl>
          </CardContent>
        </Card>
      </MainBody>
    </>
  );
}

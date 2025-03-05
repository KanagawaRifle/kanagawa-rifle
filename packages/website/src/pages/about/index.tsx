import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="協会について" />

      <MainBody>
        <h2 className="text-center text-xl">協会について</h2>

        <Card>
          <CardHeader title={'事務局'} />
          <CardContent>
            <dl className="flex">
              <dt className="w-32 block">メールアドレス</dt>
              <dd className="block flex-1">kraofficial@yahoo.co.jp</dd>
            </dl>
            <dl className="flex">
              <dt className="w-32 block">電話番号 (携帯)</dt>
              <dd className="block flex-1">080-1190-3911</dd>
            </dl>
            <dl className="flex">
              <dt className="w-32 block">FAX</dt>
              <dd className="block flex-1">046-833-6990 (くりはま花の国射撃場内)</dd>
            </dl>
            <dl className="flex">
              <dt className="w-32 block">所在地（窓口）</dt>
              <dd className="block flex-1">
                〒239-0832
                <br />
                神奈川県横須賀市神明町1番地
                <br />
                くりはま花の国エアライフル射撃場内
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'銀行口座'} />
          <CardContent>
            <dl className="flex">
              <dt className="w-32 block">ゆうちょ銀行</dt>
              <dd className="block flex-1">
                <span className="font-bold mr-2">記号</span> 10280
                <br />
                <span className="font-bold mr-2">種別</span> 総合口座
                <br />
                <span className="font-bold mr-2">番号</span> 79647111
                <br />
                <span className="font-bold mr-2">名義</span> 特定非営利活動法人神奈川県ライフル射撃協会
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'ご挨拶'} />
          <CardContent>準備中……</CardContent>
        </Card>

        <Card>
          <CardHeader title={'協会沿革'} />
          <CardContent>準備中……</CardContent>
        </Card>

      </MainBody>
    </>
  );
}

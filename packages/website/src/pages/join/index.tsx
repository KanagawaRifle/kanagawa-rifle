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
      <Meta title="入会案内" />

      <MainBody>
        <h2 className="text-center text-xl">入会案内</h2>

        <p>神奈川県ライフル射撃協会または日本ライフル射撃協会へ入会をご希望の方は、下記要領にてお申し込み下さい。</p>

        <Card>
          <CardHeader title={'入会のお申込'} />
          <CardContent>
            <Stack spacing={2}>
              <ul className="list-disc list-outside ml-6">
                <li>
                  <Link href="https://forms.gle/eNg1x3A9XDYPddHu6" target="_blank">
                    お申込フォーム
                  </Link>
                  からお申込いただけます。お申込みフォームをご利用できない方は
                  <Link href="/static/forms/membership.xlsx">入会申込書</Link>
                  に必要事項をご記入の上、
                  <Link href="/about/">当協会事務局</Link>
                  まで封書、ファックスまたは電子メールに添付でお送り下さい。
                </li>
                <li>
                  入会金・年会費等は
                  <Link href="/about/">ゆうちょ銀行または湘南信用金庫の当協会口座</Link>
                  までお振込みください。
                </li>
                <li>
                  日本ライフル射撃協会の会員証お届けまでにある程度お待ちいただくことになります。予めご留意いただけますようお願い申し上げます。
                </li>
                <li>なお、申込書・会費等を受理した後、理事会の承認を受けて正式に入会となります。</li>
              </ul>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'一般の方'} />
          <CardContent>
            <Stack spacing={2}>
              <p>入会金と年会費、計27,000円をお振込みください。</p>
              <dl>
                <dt>神奈川県ライフル射撃協会</dt>
                <dd className="pl-2">入会金 5,000円</dd>
                <dd className="pl-2">年会費 7,000円</dd>
              </dl>
              <dl>
                <dt>日本ライフル射撃協会</dt>
                <dd className="pl-2">入会金 5,000円</dd>
                <dd className="pl-2">年会費 10,000円</dd>
              </dl>
              <p>
                ※既に日本ライフル射撃協会に所属し他県から本県に移籍される場合、日本ライフル射撃協会入会金ではなく移籍料500円となります。
              </p>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'高校生の方'} />
          <CardContent>
            <Stack spacing={2}>
              <dl>
                <dt>神奈川県ライフル射撃協会</dt>
                <dd className="pl-2">入会金 1,000円</dd>
                <dd className="pl-2">年会費 2,000円</dd>
              </dl>
              <dl>
                <dt>日本ライフル射撃協会</dt>
                <dd className="pl-2">入会金 500円</dd>
                <dd className="pl-2">年会費 1,000円</dd>
              </dl>
            </Stack>
          </CardContent>
        </Card>
      </MainBody>
    </>
  );
}

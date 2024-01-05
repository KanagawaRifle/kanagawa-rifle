import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";

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

        <p>神奈川県ライフル射撃協会、または日本ライフル射撃協会へのご入会をご希望される方は下記をご参考にお申し込みください。</p>

        <Card>
          <CardHeader title={'入会のお申込'} />
          <CardContent>
            <Stack spacing={2}>
              <div>
                <Button
                  variant="outlined"
                  startIcon={<FontAwesomeIcon icon={faWpforms} />}
                  href="https://forms.gle/eNg1x3A9XDYPddHu6"
                  target="_blank"
                  sx={{
                    color: "#0ff",
                    borderColor: "#0ff",
                    '&:hover': { borderColor: "#066" },
                }}
                >
                  ご入会申込
                </Button>
              </div>
              <ul className="list-disc list-outside ml-6">
                <li>お申込および会費等のご入金後、理事会の承認を受けて正式に入会となります。</li>
                <li>
                  入会金・年会費等は
                  <Link href="/about/">ゆうちょ銀行または湘南信用金庫の当協会指定口座</Link>
                  までお振込みください。
                </li>
                <li>
                  日本ライフル射撃協会の会員証お届けまでにお時間をいただくことがございます。予めご留意いただけますようお願い申し上げます。
                </li>
                <li>
                  お申込みフォームをご利用できない方は
                  <Link href="/static/forms/membership.xlsx">入会申込書</Link>
                  に必要事項をご記入の上、
                  <Link href="/about/">当協会事務局</Link>
                  まで封書、ファックスまたは電子メールの添付にてお送り下さい。
                </li>
              </ul>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'一般の方'} />
          <CardContent>
            <Stack spacing={2}>
              <p>入会金と年会費、<strong>計27,000円</strong>をお振込みください。</p>
              <dl>
                <dt>内訳：神奈川県ライフル射撃協会</dt>
                <dd className="pl-2">入会金 5,000円</dd>
                <dd className="pl-2">年会費 7,000円</dd>
              </dl>
              <dl>
                <dt>内訳：日本ライフル射撃協会</dt>
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
              <p>入会金と年会費、<strong>計4,500円</strong>をお振込みください。</p>
              <dl>
                <dt>内訳：神奈川県ライフル射撃協会</dt>
                <dd className="pl-2">入会金 1,000円</dd>
                <dd className="pl-2">年会費 2,000円</dd>
              </dl>
              <dl>
                <dt>内訳：日本ライフル射撃協会</dt>
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

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import type {Metadata} from "next";
import {LuHouse, LuLandmark} from "react-icons/lu";

import {PageLayout} from "@/components"
import {env, paths} from "@/config";

const currentPath = paths.main.about;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
}

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        {name: paths.home.name, path: paths.home.getHref()},
        {name: currentPath.name, path: currentPath.getHref()},
      ]}
    >
      <Card>
        <CardHeader
          title={
            <Box className="flex items-center gap-2">
              <LuHouse />事務局
            </Box>
          }
        />
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
              <br/>
              神奈川県横須賀市神明町1番地
              <br/>
              くりはま花の国エアライフル射撃場内
            </dd>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title={
            <Box className="flex items-center gap-2">
              <LuLandmark/>銀行口座
            </Box>
          }
        />
        <CardContent>
          <Box className={'rounded-md text-sm font-bold p-2'}
               sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>ゆうちょ銀行からのお振込</Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>記号</Box>
            <Box className={'p-2 col-span-3'}>10280</Box>
          </Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>番号</Box>
            <Box className={'p-2 col-span-3'}>79647111</Box>
          </Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>名義</Box>
            <Box className={'p-2 col-span-3'}>特定非営利活動法人 神奈川県ライフル射撃協会</Box>
          </Box>
          <Box className={'rounded-md text-sm font-bold p-2'}
               sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>ゆうちょ銀行以外からのお振込</Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>口座</Box>
            <Box className={'p-2 col-span-3'}>ゆうちょ銀行 普通口座</Box>
          </Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>支店</Box>
            <Box className={'p-2 col-span-3'}>〇二八 店（ゼロニハチ 店）</Box>
          </Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>番号</Box>
            <Box className={'p-2 col-span-3'}>7964711</Box>
          </Box>
          <Box className={('grid grid-cols-4 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
            <Box className={'p-2'}>名義</Box>
            <Box className={'p-2 col-span-3'}>トクヒ）カナガワケンライフルシヤゲキキョウカイ</Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={'ご挨拶'}/>
        <CardContent>準備中……</CardContent>
      </Card>

      <Card>
        <CardHeader title={'協会沿革'}/>
        <CardContent>準備中……</CardContent>
      </Card>
    </PageLayout>
  );
}

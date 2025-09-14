import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {
  return (
    <>
      <Meta title="ご挨拶" />

      <MainBody>
        <h2 className="text-center text-xl">ご挨拶</h2>

        <Card>
          <CardContent>準備中……</CardContent>
        </Card>
      </MainBody>
    </>
  );
}

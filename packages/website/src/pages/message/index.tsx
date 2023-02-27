import Alert from '@kanagawa-rifle/website/components/Alert';
import AlertTitle from '@kanagawa-rifle/website/components/AlertTitle';
import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import Link from '@kanagawa-rifle/website/components/Link';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Stack from '@kanagawa-rifle/website/components/Stack';
import CardMedia from '@kanagawa-rifle/website/components/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
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

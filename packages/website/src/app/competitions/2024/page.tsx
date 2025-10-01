import { Button, ButtonGroup, Card, CardContent, CardHeader } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';

import { PageLayout } from '@/components';
import { env, paths } from '@/config';

import { Tabs } from '../_components/Tabs';

const currentPath = paths.main.competitions.children.year2024;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
  twitter: { images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL) },
};

export default function Page() {
  return (
    <PageLayout
      title={currentPath.name}
      breadcrumbs={[
        { name: paths.home.name, path: paths.home.getHref() },
        { name: paths.main.competitions.name, path: paths.main.competitions.getHref() },
        { name: currentPath.name, path: currentPath.getHref() },
      ]}
    >
      <Tabs year={2024} />

      <Card>
        <CardHeader subheader="G4大会" title="県ジュニアライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2025-02-22-kanagawa-junior-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2025-02-22-kanagawa-junior-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2025-02-22-kanagawa-junior-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G3大会" title="全関東マスターズライフル射撃競技大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-11-03-zenkanto-masters-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G3大会" title="全関東ＡＰ・ＨＲ射撃競技大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-11-03-zenkanto-ap-hr-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader={'G4大会'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-10-27-kanagawa-open-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-10-27-kanagawa-open-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-10-27-kanagawa-open-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G3大会" title="第61回全関東ライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-08-16-zenkanto-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-08-16-zenkanto-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-08-16-zenkanto-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G2大会" title="第54回東日本ライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-06-21-eastern-japan-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-06-21-eastern-japan-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-06-21-eastern-japan-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G4大会" title="国スポ最終予選兼全関東予選会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button href={paths.cdn.getHref('/competitions/2024/2024-05-26-kokuspo-trials-2nd-start-lists.pdf')}>
              射座割
            </Button>
            <Button href={paths.cdn.getHref('/competitions/2024/2024-05-26-kokuspo-trials-2nd-results.pdf')}>
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G4大会" title="国スポ一次予選兼東日本予選会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-04-21-kokuspo-trials-1st-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2024/2024-04-21-kokuspo-trials-1st-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

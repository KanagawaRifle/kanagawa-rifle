import { Button, ButtonGroup, Card, CardContent, CardHeader } from '@mui/material';
import type { Metadata } from 'next';
import React from 'react';

import { Tabs } from '@/app/competitions/_components';
import { PageLayout } from '@/components';
import { env, paths } from '@/config';

const currentPath = paths.main.competitions.children.year2023;
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
      <Tabs year={2023} />

      <Card>
        <CardHeader subheader="G4大会" title="県ジュニアライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2023/2024-02-24-kanagawa-junior-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2024-02-24-kanagawa-junior-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G4大会" title="神奈川オープン兼県ライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf')}
              target="_blank"
            >
              要項
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-11-05-kanagawa-open-championship-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-11-05-kanagawa-open-championship-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G3大会" title="第60回全関東ライフル射撃競技選手権大会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button href={paths.cdn.getHref('/competitions/2023/2023-08-18-zen-kanto-details.pdf')} target="_blank">
              要項
            </Button>
            <Button href={paths.cdn.getHref('/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf')} target="_blank">
              射座割
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G4大会" title="国体最終予選兼全関東予選会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-05-21-kokutai-trials-2nd-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-05-21-kokutai-trials-2nd-results.pdf')}
              target="_blank"
            >
              成績
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader subheader="G4大会" title="国体一次予選兼東日本予選会" />
        <CardContent>
          <ButtonGroup variant="outlined">
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-04-23-kokutai-trials-1st-start-lists.pdf')}
              target="_blank"
            >
              射座割
            </Button>
            <Button
              href={paths.cdn.getHref('/competitions/2023/2023-04-23-kokutai-trials-1st-results.pdf')}
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

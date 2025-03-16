import * as React from 'react';

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Card from '@kanagawa-rifle/website/components/Card';
import CardContent from '@kanagawa-rifle/website/components/CardContent';
import CardHeader from '@kanagawa-rifle/website/components/CardHeader';
import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {

  return (
    <>
      <Meta category="大会関係"  title="2023年度 (令和5年度)"/>

      <MainBody>
        <h2 className="text-center text-xl">大会関係</h2>

        <Tabs
          value={"2024"}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            key={-1}
            className={'font-bold'}
            component={Link as React.ElementType}
            label={"2025"}
            href={`/competitions`}
            value={"2025"}
          />
          {["2024", "2023", "2022"].map((item,index) => {
            return <Tab
              key={index}
              className={'font-bold'}
              component={Link as React.ElementType}
              label={item}
              href={`/competitions/${item}`}
              value={item}
            />
          })}
        </Tabs>
        <h3 className="text-center text-2xl">2024年度 (令和6年度)</h3>

        <Card>
          <CardHeader subheader="令和6年度" title="県ジュニアライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2024/2025-02-22-kanagawa-junior-championship-details.pdf" target="_blank">要項</Button>
              <Button href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2024/2025-02-22-kanagawa-junior-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="https://601207993370-kanagawa-rifle-all-prod-public.s3.ap-northeast-1.amazonaws.com/website/competitions/2024/2025-02-22-kanagawa-junior-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G3大会" title="全関東マスターズライフル射撃競技大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-11-03-zenkanto-masters-details.pdf" target="_blank">要項</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G3大会" title="全関東ＡＰ・ＨＲ射撃競技大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-11-03-zenkanto-ap-hr-details.pdf" target="_blank">要項</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader={'G4大会'} title={'神奈川オープン兼県ライフル射撃競技選手権大会'} />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-10-27-kanagawa-open-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2024/2024-10-27-kanagawa-open-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-10-27-kanagawa-open-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G3大会" title="第61回全関東ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-08-16-zenkanto-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G2大会" title="第54回東日本ライフル射撃競技選手権大会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-details.pdf" target="_blank">要項</Button>
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-06-21-eastern-japan-championship-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国スポ最終予選兼全関東予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-start-lists.pdf">射座割</Button>
              <Button href="/static/competitions/2024/2024-05-26-kokuspo-trials-2nd-results.pdf">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国スポ一次予選兼東日本予選会" />
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-start-lists.pdf" target="_blank">射座割</Button>
              <Button href="/static/competitions/2024/2024-04-21-kokuspo-trials-1st-results.pdf" target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

      </MainBody>
    </>
  );
}

import * as React from 'react';

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from "@mui/material/Link";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import useStaticFileUrl from "@kanagawa-rifle/website/hooks/useStaticFileUrl";
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';

export default function Page() {

  return (
    <>
      <Meta category="大会関係"  title="2023年度 (令和5年度)"/>

      <MainBody>
        <h2 className="text-center text-xl">大会関係</h2>

        <Tabs
          value={"2023"}
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
        <h3 className="text-center text-2xl">2023年度 (令和5年度)</h3>

        <Card>
          <CardHeader subheader="G4大会" title="県ジュニアライフル射撃競技選手権大会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-details.pdf')}
                      target="_blank">要項</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2024-02-24-kanagawa-junior-championship-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="神奈川オープン兼県ライフル射撃競技選手権大会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-details.pdf')}
                      target="_blank">要項</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2023-11-05-kanagawa-open-championship-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G3大会" title="第60回全関東ライフル射撃競技選手権大会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2023/2023-08-18-zen-kanto-details.pdf')} target="_blank">要項</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2023-08-18-zen-kanto-start-lists.pdf')}
                      target="_blank">射座割</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国体最終予選兼全関東予選会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2023/2023-05-21-kokutai-trials-2nd-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2023-05-21-kokutai-trials-2nd-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国体一次予選兼東日本予選会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2023/2023-04-23-kokutai-trials-1st-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2023/2023-04-23-kokutai-trials-1st-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

      </MainBody>
    </>
  );
}

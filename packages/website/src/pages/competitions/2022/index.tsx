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
          value={"2022"}
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
        <h3 className="text-center text-2xl">2022年度 (令和4年度)</h3>

        <Card>
          <CardHeader subheader="G4大会" title="神奈川オープン兼県ライフル射撃競技選手権大会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2022/2022-11-06-kanagawa-open-championship-details.pdf')}
                      target="_blank">要項</Button>
              <Button href={useStaticFileUrl('/competitions/2022/2022-11-06-kanagawa-open-championship-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2022/2022-11-06-kanagawa-open-championship-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国体最終予選兼全関東予選会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2022/2022-05-22-kokutai-trials-2nd-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2022/2022-05-22-kokutai-trials-2nd-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader subheader="G4大会" title="国体一次予選兼東日本予選会"/>
          <CardContent>
            <ButtonGroup variant="outlined">
              <Button href={useStaticFileUrl('/competitions/2022/2022-04-24-kokutai-trials-1st-start-lists.pdf')}
                      target="_blank">射座割</Button>
              <Button href={useStaticFileUrl('/competitions/2022/2022-04-24-kokutai-trials-1st-results.pdf')}
                      target="_blank">成績</Button>
            </ButtonGroup>
          </CardContent>
        </Card>

      </MainBody>
    </>
  );
}

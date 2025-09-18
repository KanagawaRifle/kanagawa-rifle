import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import type {Metadata} from "next";
import React from "react";
import {LuBox, LuCircleCheck} from "react-icons/lu";

import {PageLayout} from "@/components";
import {env, paths} from "@/config";

import {EntryInfoCard, EventCard} from "./_components"
import {year2025} from "./_databases"

const currentPath = paths.main.competitions;
export const metadata: Metadata = {
  title: currentPath.name,
  description: currentPath.description,
  openGraph: {images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL)},
  twitter: {images: new URL(`/api/og?title=${currentPath.name}`, env.APP_URL)},
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

      <Tabs
        value={"2025"}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        textColor="inherit"
      >
        <Tab
          key={-1}
          sx={{fontWeight: '700'}}
          component={Link as React.ElementType}
          label={"2025"}
          href={`/competitions`}
          value={"2025"}
        />
        {["2024", "2023", "2022"].map((item, index) => {
          return <Tab
            key={index}
            sx={{fontWeight: '700'}}
            component={Link as React.ElementType}
            label={item}
            href={`/competitions/${item}`}
            value={item}
          />
        })}
      </Tabs>

      <EntryInfoCard/>

      <Card>
        <CardHeader title="参加料" />
        <CardContent>
          <Box className="grid grid-cols-3 gap-0 text-center mx-auto">
            <Typography variant="body2" color="text.secondary" className="text-left p-2">
              種別
            </Typography>
              <Box className="font-bold flex items-center gap-2 justify-center p-2">
                <LuBox className="text-purple-400" aria-hidden="true" />
                一般
              </Box>
              <Box className="font-bold flex items-center gap-2 justify-center p-2">
                <LuBox className="text-rose-400" aria-hidden="true" />
                高校生以下
              </Box>
          </Box>
          <Box className="rounded-md text-sm font-bold p-2 bg-slate-50 border border-slate-300" >
            全種目
          </Box>
          <Box className="grid grid-cols-3 gap-0 text-center text-left border-b border-slate-300">
            <Box className="p-2" color="text.secondary" >G3 大会</Box>
            <Box className="p-2 flex items-center justify-center gap-2">
              <Typography color="primary"><LuCircleCheck /></Typography>
              8,000円
            </Box>
            <Box className="p-2 flex items-center justify-center gap-2">
              <Typography color="primary"><LuCircleCheck /></Typography>
              4,000円
            </Box>
          </Box>
          <Box className="grid grid-cols-3 gap-0 text-center text-left">
            <Box className="p-2" color="text.secondary" >G4 大会</Box>
            <Box className="p-2 flex items-center justify-center gap-2">
              <Typography color="primary"><LuCircleCheck /></Typography>
              7,000円
            </Box>
            <Box className="p-2 flex items-center justify-center gap-2">
              <Typography color="primary"><LuCircleCheck /></Typography>
              3,500円
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <p>
            ※ （令和7年度より）国スポ保険料の
            <strong className="underline">別途お振込みは不要です</strong>
            。保険料は参加料に含まれます。
          </p>
          <p>※ ハンドライフルは普及大会となります。</p>
          <p>※ （令和7年度より）すべての大会が参加賞付きとなります。</p>
          <p>
            ※ （令和7年度より）これまでの参加料は、紙標的を使用した大会を前提に設定しておりましたが、このたび複雑な料金体系を整理し、より分かりやすい参加料に改定いたしました。
          </p>
        </CardContent>
      </Card>


      {year2025.map((event, index) => (<EventCard
        key={index}
        name={event.name}
        actions={event.actions}
        grade={event.grade}
        date={event.date}
        pet={event.pet}
        deadline={event.deadline}
        venue={event.venue}
      />))}

    </PageLayout>
  );
}

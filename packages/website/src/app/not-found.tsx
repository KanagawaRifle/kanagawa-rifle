import {
  Box,
  Card,
  CardHeader,
  CardContent
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Metadata } from 'next'
import React from 'react'
import {LuFrown, LuHouse} from "react-icons/lu";

import {PageLayout} from "@/components";



const title = "Not Found";
const description = "指定されたページが見つかりませんでした。";

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  return (
    <PageLayout>
      <Card>
        <CardHeader title={
          <Box className="font-bold text-2xl text-center">{title}</Box>
        } />
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <Typography color="text.secondary" className="flex gap-4 items-center justify-center">
            <LuFrown className="text-7xl" />
            <Box className="text-7xl font-black" component="span">404</Box>
          </Typography>
          <Box>
            <Box className="text-center">{description}</Box>
          </Box>
          <Box>
            <Button href="/" startIcon={<LuHouse />}>ホームへ</Button>
          </Box>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

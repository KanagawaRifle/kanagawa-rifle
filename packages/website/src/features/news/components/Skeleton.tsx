
import 'highlight.js/styles/github-dark.css';

import {
  Box,
  Card,
  CardContent,
  Stack,
  ButtonGroup,
  Button,
  Chip,
  Skeleton as MuiSkeleton
} from '@mui/material';
import Link from "next/link";
import React from 'react';
import {LuCalendar, LuHash} from "react-icons/lu";

import ShareLinks from "@/features/news/components/ShareLinks";

export default function MySkeleton()
{
  return (
    <article className="max-w-4xl mx-auto">

      <header className="mb-8">
        <Box className="flex justify-end mb-2">
          <ButtonGroup>
            <ShareLinks title={''} url={''} loading={true}  />
            <Button variant="text" loading loadingPosition="start">更新</Button>
          </ButtonGroup>
        </Box>
        <Stack direction="row" spacing={1}>
          <Chip label={<MuiSkeleton width="4rem"/>} icon={<LuCalendar/>} variant="outlined"/>
          {[...Array(2).keys()].map((_, index) => (
            <Chip key={index} label={<MuiSkeleton width="2rem"/>} icon={<LuHash />} variant="outlined" color="primary"/>
          ))}
        </Stack>
      </header>

      {/* 概要 */}
      <div className="bg-gray-50 p-6 mb-8 rounded-r-lg">
        <p className="text-gray-700 italic text-lg leading-relaxed">
          {[...Array(2).keys()].map(((_, index) => <MuiSkeleton key={index} />))}
          <MuiSkeleton width="60%"/>
        </p>
      </div>

      <Card>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 pb-3 border-b-2 border-gray-200 first:mt-0  no-underline" >
            <MuiSkeleton />
          </h1>
          {[...Array(5).keys()].map(((_, index) => <MuiSkeleton key={index} />))}
          <MuiSkeleton width="60%"/>
        </CardContent>
      </Card>

      <footer>
        <Box className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button component={Link} href="/news">一覧に戻る</Button>
        </Box>
      </footer>
    </article>
  )
}

// packages/website/src/components/ErrorFallback.tsx

import { Button, Typography } from '@mui/material';
import React from 'react';
import { LuRefreshCcw } from 'react-icons/lu';

export function ErrorFallback() {
  return (
    <Typography
      color="error"
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      role="alert"
    >
      <h2 className="text-lg font-semibold">エラーが発生しました (T_T) </h2>
      <Button
        variant="outlined"
        color="error"
        onClick={() => window.location.assign(window.location.origin)}
        startIcon={<LuRefreshCcw />}
      >
        更新
      </Button>
    </Typography>
  );
}

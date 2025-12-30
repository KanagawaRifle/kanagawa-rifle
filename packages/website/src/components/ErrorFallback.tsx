// packages/website/src/components/ErrorFallback.tsx

import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { LuRefreshCcw } from 'react-icons/lu';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      component="div"
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      role="alert"
      aria-live="assertive"
    >
      <Typography color="error" variant="h5" component="h2" className="font-semibold">
        エラーが発生しました (T_T)
      </Typography>
      {process.env.NODE_ENV === 'development' && error?.message && (
        <Typography
          component="pre"
          className="max-w-md overflow-auto rounded bg-gray-100 p-2 text-sm"
          sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {error.message}
        </Typography>
      )}
      <Button variant="outlined" color="error" onClick={resetErrorBoundary} startIcon={<LuRefreshCcw />}>
        更新
      </Button>
    </Box>
  );
}

// packages/website/src/theme.ts

'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: '#288140',
    },
    secondary: {
      main: '#e37400',
    },
    text: {
      primary: 'rgb(0 0 0 /82%)',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Noto Sans JP, Segoe UI, Hiragino Sans, Noto Sans CJK JP, Yu Gothic, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Sans Emoji',
    fontSize: 14,
    body1: {
      lineHeight: 1.8,
    },
    body2: {
      lineHeight: 1.8,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '14px',
          lineHeight: 1.8,
          '@media (min-width: 768px)': {
            fontSize: '16px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderColor: '#9ca3af',
          borderStyle: 'solid',
          fontSize: 'inherit',
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(0 0 0 /0.11)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '1.25rem',
          fontWeight: 500,
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.14rem',
        },
      },
    },
  },
});

export default theme;

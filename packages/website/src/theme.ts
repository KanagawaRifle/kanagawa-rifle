'use client'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#288140',
    },
    secondary: {
      main: '#e37400',
    },
    text: {
      primary: '#202124',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Noto Sans JP, Segoe UI, Hiragino Sans, Noto Sans CJK JP, Yu Gothic, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Sans Emoji',
  },
  components: {
    MuiAlert: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderColor: '#9ca3af',
          borderStyle: 'solid',
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
})

export default theme

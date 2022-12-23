import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    text: {
      primary: '#fff',
    },
    background: {
      default: '#204000',
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, Noto Sans JP, Segoe UI, Hiragino Sans, Noto Sans CJK JP, Yu Gothic, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Sans Emoji',
  },
});

export default theme;

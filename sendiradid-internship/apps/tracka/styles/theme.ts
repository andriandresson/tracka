import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#DDE3E9',
    },
    primary: {
      main: '#278BFC',
      dark: '#0365D3',
      light: '#72B3FD',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#FC7427',
      dark: '#D34E03',
      light: '#FDA472',
      contrastText: '#FFF',
    },
    background: {
      paper: '#0C1B2C',
      default: '#081421',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          color: '#DDE3E9',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '1rem',
          paddingBlock: '0.25rem',
          paddingInline: '1.25rem',
          textTransform: 'none',
        },
      },
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: "'Inter','Helvetica','Arial',sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '0em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '0em',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0em',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.688rem',
      letterSpacing: '0em',
    },
    body1: {
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0em',
    },
  },
});

export default theme;

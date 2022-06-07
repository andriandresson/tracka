import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#FFF',
    },
    primary: {
      main: '#278BFC',
      dark: '#0365D3',
      light: '#72B3FD',
      contrastText: '#FFF',
    },
    background: {
      paper: '#0A1929',
      default: '#0A1929',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          color: '#FFF',
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
        },
      },
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Inter','Helvetica','Arial',sans-serif",
    h1: {
      fontFamily: "'kanit','Helvetica','Arial',sans-serif",
      fontWeight: 400,
      fontSize: '3.5rem',
      letterSpacing: '0em',
    },
    h2: {
      fontFamily: "'kanit','Helvetica','Arial',sans-serif",
      fontWeight: 400,
      fontSize: '2rem',
      letterSpacing: '0em',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
      letterSpacing: '0em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0em',
    },
    body1: {
      fontWeight: 300,
      fontSize: '1.125rem',
      letterSpacing: '0em',
    },
    body2: {
      fontWeight: 500,
      fontSize: '0.6875rem',
      letterSpacing: '0em',
    },
    button: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '0em',
    },
  },
});

export default theme;

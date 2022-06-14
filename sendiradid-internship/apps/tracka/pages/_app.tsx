import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Auth from '../components/auth';
import '../styles/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/kanit';
import '@fontsource/inter';
import theme from '../styles/theme';

function CustomApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Welcome to tracka!</title>
        </Head>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeProvider>
  );
}

export default CustomApp;

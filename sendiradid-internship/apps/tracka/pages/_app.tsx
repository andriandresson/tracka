import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Auth from '../components/auth';
import '../styles/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/kanit';
import '@fontsource/inter';
import theme from '../styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApplicationProvider } from 'apps/tracka/components/appContext';
import { withAuth } from 'apps/tracka/components/withAuth';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps, router }) {
  const isLoginPage = router?.pathname.includes('/login');
  console.log('isLoginPage', isLoginPage)
  const Screen = isLoginPage ? Component : withAuth(Component);
  const isDev = process.env.NODE_ENV === 'development';
  return (
    <ApplicationProvider>


      <ThemeProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />

          <title>Welcome to tracka!</title>
        </Head>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
             <Screen {...pageProps}></Screen>
            {isDev && <ReactQueryDevtools></ReactQueryDevtools>} 
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </ApplicationProvider>

  );
}

export default CustomApp;

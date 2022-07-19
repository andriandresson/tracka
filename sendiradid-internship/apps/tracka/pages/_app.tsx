import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/kanit';
import '@fontsource/inter';
import theme from '../styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApplicationProvider } from '../components/appContext';
import { withAuth } from '../components/withAuth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import '../styles/CalendarStyle.css'; // custom style file
import { GlobalStyles } from '@mui/styled-engine';
import { globalStyles } from '../styles/globalStyles';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps, router }) {
  const isLoginPage = router?.pathname.includes('/login');
  console.log('isLoginPage', isLoginPage);
  const Screen = isLoginPage ? Component : withAuth(Component);
  const isDev = process.env.NODE_ENV === 'development';
  return (
    <ApplicationProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </ApplicationProvider>
  );
}

export default CustomApp;

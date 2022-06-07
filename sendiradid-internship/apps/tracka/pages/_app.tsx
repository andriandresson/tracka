import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Auth from '../components/auth';
import '../styles/styles.css';
const queryClient = new QueryClient()




function CustomApp({ Component, pageProps }) {
  
  return (
      <>
      <Head>
        <title>Welcome to tracka!</title>
      </Head> 
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      </QueryClientProvider>
    </SessionProvider>
    </>
  );
}

export default CustomApp;
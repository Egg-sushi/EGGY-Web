import React from 'react';
import Modal from 'react-modal';
import type { AppContext, AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClient, QueryClientProvider, dehydrate } from 'react-query';

import { globalStyles, theme } from '@/theme';
import { ProductService } from '@/api/service';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const dehydratedState = dehydrate(queryClient);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResizeWindow = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      window.addEventListener('resize', handleResizeWindow);

      return () => {
        window.removeEventListener('resize', handleResizeWindow);
      };
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

Modal.setAppElement('#__next');

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  try {
    const filters = await ProductService.getAllFilters();

    pageProps = { ...pageProps, filters };
    return { pageProps };
  } catch (err) {
    return { pageProps };
  }
};

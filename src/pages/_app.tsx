import React from 'react';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClient, QueryClientProvider, dehydrate } from 'react-query';

import { globalStyles, theme } from '@/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const dehydratedState = dehydrate(queryClient);

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

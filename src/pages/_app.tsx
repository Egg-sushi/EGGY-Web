import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { globalStyles, theme } from '@/theme';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

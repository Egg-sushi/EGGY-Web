import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { globalStyles, theme } from '@/theme';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <style jsx global>{`
          html {
            font-family: ${pretendard.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

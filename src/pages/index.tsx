import Head from 'next/head';
import styled from '@emotion/styled';

import useLink from '@/hooks/useLink';
import { Header } from '@/components';
import { getRedirectFlag } from '@/utils';
import {
  LandingAboutSkintypeTestSection,
  LandingAboutUsSection,
  LandingCosmeticSection,
  LandingNextSection,
  LandingSkintypeTestSection,
} from '@/components/landing';

export default function Home() {
  const link = useLink();

  if (getRedirectFlag()) {
    link.to('skinTypeTestResult');
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <LandingSkintypeTestSection />
        <LandingAboutSkintypeTestSection />
        <LandingCosmeticSection />
        <LandingAboutUsSection />
        <LandingNextSection />
      </Main>
    </>
  );
}

const Main = styled.main`
  scroll-snap-type: y proximity;
`;

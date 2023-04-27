import Head from 'next/head';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

import { Button, Flex, Header, LandingScrollText, Text } from '@/components';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <InfiniteScrollText row={5} />
      <main style={{ paddingInline: 34, paddingBottom: 80 }}>
        <Flex gap={24}>
          <Bar>
            <Circle isActive={true} y={0} />
            <Circle isActive={false} y={164} />
            <Circle isActive={false} y={246} />
          </Bar>
          <Flex flexDirection="column">
            <Card as={'section'} flexDirection="column" gap={'8px'}>
              <Text variant="h7" fontColor={theme.colors.primary}>
                Baumann Test
              </Text>
              <Text variant="body5" fontColor={theme.colors.primary}>
                Lorem Ipsum is simply dummy text of the printing and typesetting. Lorem Ipsum has
                been the industry`s standard dummy text ever.
              </Text>
              <Button variant="filled" style={{ width: 53, padding: '2px 16px', alignSelf: 'end' }}>
                <Text
                  variant="body5"
                  fontColor={theme.colors.white}
                  onClick={() => router.push('/baumann')}
                >
                  Try it
                </Text>
              </Button>
            </Card>
            <Flex style={{ marginTop: 48, marginBottom: 36 }}>
              <Text variant="h7" fontColor={theme.colors.gray400}>
                Recommend K-Skincare
              </Text>
              <Text variant="body5" fontColor={theme.colors.gray400}>
                : Do you wanna K-Skincare for your Skin Type?
              </Text>
            </Flex>
            <Flex>
              <Text variant="h7" fontColor={theme.colors.gray400}>
                Check Skincare For You (OCR)
              </Text>
              <Text variant="body5" fontColor={theme.colors.gray400}>
                : Do you wanna know if your Skincare fit your Skin Type?
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </main>
    </>
  );
}

const InfiniteScrollText = styled(LandingScrollText)`
  padding-top: 120px;
  padding-bottom: 80px;
`;

const Card = styled(Flex)`
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.blue50};
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const Bar = styled.div`
  width: 2px;
  height: 248px;
  content: '';
  margin-top: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

type StyleCircleProps = {
  isActive: boolean;
  y: number;
};
const Circle = styled.span<StyleCircleProps>`
  width: ${({ isActive }) => (isActive ? '16px' : '10px')};
  height: ${({ isActive }) => (isActive ? '16px' : '10px')};
  content: '';
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray200};
  position: absolute;
  left: 0.5px;
  top: ${({ y }) => `${y}px`};
  bottom: 0;
  transform: translateX(-50%);
  box-sizing: border-box;
  border: 1px solid $#2b63da;
  border: ${({ theme, isActive }) => isActive && `1px solid ${theme.colors.primary}`};
  box-shadow: ${({ theme, isActive }) => isActive && `inset 0 0 0 2px ${theme.colors.white}`};
`;

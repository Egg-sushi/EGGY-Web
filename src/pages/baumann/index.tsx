import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, CircleCheckBox, Flex, Header, Icon, Text, Title } from '@/components';
import { theme } from '@/theme';

const BAUMANN_FEATURES = [
  'Improved your skin health 1',
  'Improved your skin health 2',
  'Improved your skin health 3',
];

export default function BaumannIntroPage() {
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
      <Wrapper as={'section'} flexDirection="column" justifyContent="space-evenly">
        <Title
          size="lg"
          title={'Baumann Test'}
          description={'Do you wanna know Your Skin Type?'}
          color={theme.colors.primary}
        />
        <ImageWrapper>
          <Image priority width={140} height={120} src="/Diamond2.png" alt="baumman-thumbnail" />
        </ImageWrapper>
        <Flex as={'ul'} flexDirection="column" gap={24}>
          {BAUMANN_FEATURES.map((feature) => (
            <FeatureItem key={feature}>
              <CircleCheckBox checked={true} />
              <Text variant="body2">{feature}</Text>
            </FeatureItem>
          ))}
        </Flex>
        <Button
          variant="filled"
          Icon={<Icon type="rightArrow" width={14} height={14} />}
          iconPosition="end"
          style={{ paddingBlock: 14 }}
          onClick={() => router.push('/baumann/question')}
        >
          Let`s Start
        </Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled(Flex)`
  padding-top: 60px;
  padding-inline: 34px;
  height: calc(100% - 60px);
  background-color: ${({ theme }) => theme.colors.blue50};
`;

const ImageWrapper = styled.div`
  position: relative;
  text-align: center;
`;

const FeatureItem = styled.li`
  display: flex;
  border-radius: 10px;
  padding-block: 12px;
  padding-inline: 20px;
  background-color: ${({ theme }) => theme.colors.blue100};
  cursor: pointer;
  position: relative;

  &,
  & > div {
    transition: all 0.2s ease-in;
  }

  & > div {
    padding-left: 20px;
    color: ${({ theme }) => theme.colors.blue500};
  }
`;

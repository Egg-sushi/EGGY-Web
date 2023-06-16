import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import useLink from '@/hooks/useLink';
import { getAnswers, share } from '@/utils';
import { BASE_FRONT_URL } from '@/constants';
import { useCalculateSkinTypes } from '@/api/query';
import { Button, CharacterCard, Flex, Header, Icon, SkinTypeDescription, Text } from '@/components';
import Image from 'next/image';

export default function SkinTypeTestResultPage() {
  const theme = useTheme();
  const link = useLink();
  const [isFrontShow, setIsFrontShow] = React.useState<boolean>(true);

  const calculatedSkinTypeData = useCalculateSkinTypes(
    Object.entries(getAnswers()).map((answer) => ({
      questionId: Number(answer[0]),
      answerId: answer[1],
    })),
  );

  const handleClickResetButton = React.useCallback(() => {
    link.to('skinTypeTestIntro');
  }, [link]);

  const handleClickShareButton = React.useCallback(async () => {
    const result = await share({
      title: 'Find your SkinType',
      text: 'Do you want to know your skinType?',
      url: `${BASE_FRONT_URL}/skintype/shared/${calculatedSkinTypeData.data?.type}`,
    });
    if (result === 'copiedToClipboard') {
      alert('Copy completed.');
    }
  }, [calculatedSkinTypeData.data?.type]);

  if (calculatedSkinTypeData.isSuccess) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Wrapper flexDirection="column" paddingTop={36} color={theme.colors.blue50}>
          {(['green', 'blue', 'white'] as const).map((color) => (
            <BackgroundCircle key={color} color={color} />
          ))}
          {isFrontShow ? (
            <TopDescription justifyContent="center" alignItems="center" gap={8}>
              <Icon type="Down" fill={theme.colors.gray500} />
              <Text variant="body2">Tap the card to turn it over</Text>
            </TopDescription>
          ) : (
            <TopDescription
              justifyContent="center"
              alignItems="center"
              gap={8}
              onClick={() => link.to('skinTypeTestIntro')}
            >
              <Icon type="Refresh" fill={theme.colors.primary} />
              <Text variant="body2" fontColor={theme.colors.primary}>
                Try agin
              </Text>
            </TopDescription>
          )}
          <CardWrapper>
            <CharacterCard
              isFrontShow={isFrontShow}
              tags={calculatedSkinTypeData.data.info?.hashTags.split(' ')}
              skinType={calculatedSkinTypeData.data.type}
              characterName={calculatedSkinTypeData.data.info.characterName}
              percents={calculatedSkinTypeData.data.percents}
              onClick={() => setIsFrontShow((prev) => !prev)}
            />
          </CardWrapper>
          <Flex
            justifyContent="space-between"
            gap={48}
            style={{ paddingInline: 50, marginTop: 40 }}
          >
            <Button
              variant="filled"
              hierarchy="gray"
              onClick={handleClickResetButton}
              borderRadius={24}
              style={{ gap: 10 }}
            >
              <Icon type="Review" fill={theme.colors.white} />
              Retry
            </Button>
            <Button
              variant="filled"
              onClick={handleClickShareButton}
              borderRadius={24}
              style={{ gap: 10 }}
            >
              <Icon type="Share" fill={theme.colors.white} />
              Share
            </Button>
          </Flex>
          <Description
            userName={'userName'}
            tips={calculatedSkinTypeData.data.tips}
            skinType={calculatedSkinTypeData.data.type}
            description={calculatedSkinTypeData.data.info.description}
            onClickShare={handleClickShareButton}
          />
          <Image
            src="/find_cosmetic.png"
            alt="find-more-cosmetic-for-you"
            width={320}
            height={320}
            style={{ marginInline: 'auto' }}
          />
          <FindText variant="h3" weight={400}>
            UserName,
          </FindText>
          <FindText variant="h3" weight={400}>
            would you like to get a recommendation for a product that suits your skin type?
          </FindText>
          <TryButton
            hierarchy="darkBlue"
            variant="filled"
            width={140}
            borderRadius={15}
            onClick={() => link.to('products')}
          >
            <Text variant="body1" fontColor={theme.colors.white}>
              Try it now
            </Text>
          </TryButton>
          <Bottom>
            <Text variant="h6" fontColor={theme.colors.gray500}>
              If tou like our test can you give us some feedback?
            </Text>
            <Text variant="body3" fontColor={theme.colors.gray500}>
              If you give us feedback and share, we can give you the right cosmetics through a
              lottery.
            </Text>
          </Bottom>
        </Wrapper>
      </>
    );
  }
}

const Wrapper = styled(Flex)`
  position: relative;
  overflow: hidden;
`;

const TopDescription = styled(Flex)`
  padding-top: 46px;
  z-index: 95;
`;

const ColorStyle = {
  green: {
    top: '9px',
    left: '118px',
    size: '443px',
    color: '#DFF2D3',
  },
  blue: {
    top: '163px',
    left: '-171px',
    size: '453px',
    color: '#EBF1FF',
  },
  white: {
    top: '334px',
    left: '85px',
    size: '433px',
    color: '#FFFDF7',
  },
} as const;

const BackgroundCircle = styled.div<{ color: 'green' | 'blue' | 'white' }>`
  border-radius: 50%;
  filter: blur(50px);
  position: absolute;
  content: '';
  z-index: 0;
  background-color: ${({ color }) => ColorStyle[color].color};
  width: ${({ color }) => ColorStyle[color].size};
  height: ${({ color }) => ColorStyle[color].size};
  top: ${({ color }) => ColorStyle[color].top};
  left: ${({ color }) => ColorStyle[color].left};
`;

const CardWrapper = styled.div`
  padding: 36px 32px;
`;

const Description = styled(SkinTypeDescription)`
  margin-top: 60px;
  margin-bottom: 100px;
`;

const FindText = styled(Text)`
  padding-inline: 40px;

  :not(& + div) {
    margin-top: 35px;
  }
`;

const TryButton = styled(Button)`
  padding: 13px 28px;
  box-sizing: border-box;
  margin-top: 50px;
  margin-bottom: 100px;
  margin-inline: auto;
`;

const Bottom = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: 44px 40px 76px 40px;

  div + div {
    margin-top: 20px;
  }
`;

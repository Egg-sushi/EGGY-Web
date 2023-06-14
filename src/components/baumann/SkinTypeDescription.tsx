import { SkinType, Tip } from '@/types/baumann';
import styled from '@emotion/styled';
import { Button, FlipCard, Icon, Text } from '../common';
import React from 'react';
import { useTheme } from '@emotion/react';
import { Flex } from '../styled';
import Image from 'next/image';

interface Props {
  userName?: string;
  skinType: SkinType;
  description: string;
  tips: Tip[];
  className?: string;
  onClickShare: VoidFunction;
}

function SkinTypeDescription({
  userName,
  skinType,
  description,
  tips,
  className,
  onClickShare,
}: Props) {
  const theme = useTheme();

  return (
    <Wrapper className={className}>
      {userName && <strong style={{ display: 'block' }}>{userName},</strong>}
      <strong>your skin type is {skinType}</strong>
      <Text variant="body1" style={{ marginTop: 40, marginBottom: 60 }}>
        {description}
      </Text>
      <Flex flexDirection="column" gap={24}>
        {tips.map((tip, idx) => (
          <Card key={idx}>
            <TipHeader variant="h6" fontColor={theme.colors.primary}>
              Tip. 0{idx + 1}
            </TipHeader>
            <ImageWrapper>
              <Image src={tip.imageUrl} width={316} height={188} alt="tip-image" />
            </ImageWrapper>
            <Flex flexDirection="column" gap={30} marginTop={26}>
              <Text variant="h3" style={{ fontSize: 30 }}>
                {tip.title}
              </Text>
              <Text variant="body1">{tip.description}</Text>
            </Flex>
          </Card>
        ))}
      </Flex>
      <ShareButton
        variant="filled"
        width={140}
        onClick={onClickShare}
        borderRadius={115}
        style={{ gap: 10 }}
      >
        <Icon type="Share" fill={theme.colors.white} />
        Share
      </ShareButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 60px 40px 100px 40px;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.blue50};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  border-radius: 20px;

  & > strong {
    font-size: 30px;
    line-height: 36px;
    font-weight: 500;
  }
`;

const Card = styled.div`
  box-sizing: border-box;
  text-align: center;
  padding: 30px 35px 50px 35px;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => `1px solid ${theme.colors.white}`};
  border-radius: 20px;

  img {
    max-width: 100%;
    filter: drop-shadow(1px 3px 6px rgba(0, 0, 0, 0.2));
  }
`;

const TipHeader = styled(Text)`
  width: fit-content;
  padding: 4px 12px;
  margin-inline: auto;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.colors.blue200}`};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.blue50};
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ShareButton = styled(Button)`
  margin-top: 60px;
  margin-inline: auto;
`;

export default SkinTypeDescription;

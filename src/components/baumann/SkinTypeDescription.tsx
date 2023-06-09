import { SkinType, Tip } from '@/types/baumann';
import styled from '@emotion/styled';
import { Button, FlipCard, Text } from '../common';
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
  const [isFrontShow, setIsFrontShow] = React.useState<boolean[]>([...tips].map(() => true));

  const handleClickCard = React.useCallback(
    (idx: number) => {
      const nextIsFrontShow = [...isFrontShow];
      nextIsFrontShow[idx] = !nextIsFrontShow[idx];
      setIsFrontShow(nextIsFrontShow);
    },
    [isFrontShow],
  );

  return (
    <Wrapper className={className}>
      {userName && <strong style={{ display: 'block' }}>{userName},</strong>}
      <strong>your skin type is {skinType}</strong>
      <Text variant="body1" style={{ marginTop: 40, marginBottom: 60 }}>
        {description}
      </Text>
      <Flex flexDirection="column" gap={24}>
        {tips.map((tip, idx) => (
          <FlipCard
            key={tip.id}
            height={350}
            isFrontShow={isFrontShow[idx]}
            front={
              <Card isFirst={idx === 0} padding="15px 36px 50px 36px">
                <FrontImageWrapper>
                  <FrontImage src={'/peach.png'} width={350} height={200} alt="tip-image" />
                </FrontImageWrapper>
                <Flex flexDirection="column" gap={40} marginTop={18}>
                  <strong style={{ whiteSpace: 'nowrap' }}>{tip.title}</strong>
                  <span>Read More ≫</span>
                </Flex>
              </Card>
            }
            back={
              <Card isFirst={idx === 0} padding="36px">
                <Text
                  variant="body1"
                  fontColor={idx === 0 ? theme.colors.white : theme.colors.black}
                >
                  {tip.description}
                </Text>
              </Card>
            }
            onClick={() => handleClickCard(idx)}
          />
        ))}
      </Flex>
      <ShareButton hierarchy="primary" variant="filled" width={140} onClick={onClickShare}>
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

const Card = styled.div<{ isFirst: boolean; padding: React.CSSProperties['padding'] }>`
  box-sizing: border-box;
  height: 350px;
  text-align: center;
  padding: ${({ padding }) => padding};
  color: ${({ isFirst, theme }) => (isFirst ? theme.colors.white : theme.colors.black)};
  background-color: ${({ isFirst, theme }) =>
    isFirst ? theme.colors.blue700 : theme.colors.white};
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.08);
  border-radius: 20px;

  // FIXME: TEXT 폰트 재설정
  strong {
    font-size: 30px;
  }

  span {
    font-size: 20px;
  }
`;

const FrontImageWrapper = styled.div`
  position: relative;

  &,
  & > img {
    filter: drop-shadow(2px 4px 25px rgba(0, 0, 0, 0.24));
  }
`;

const FrontImage = styled(Image)`
  max-width: 100%;
`;

const ShareButton = styled(Button)`
  margin-top: 60px;
  margin-inline: auto;
`;

export default SkinTypeDescription;

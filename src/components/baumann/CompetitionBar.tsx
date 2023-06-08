import styled from '@emotion/styled';
import { Text } from '../common';
import { Flex } from '../styled';
import { useTheme } from '@emotion/react';

interface Props {
  firstItemText: string;
  firstItemValue: number;
  secondItemText: string;
  secondItemValue: number;
}

function CompetitionBar({ firstItemText, firstItemValue, secondItemText, secondItemValue }: Props) {
  const theme = useTheme();
  const firstRate =
    firstItemValue === 0 ? 0 : (firstItemValue / (firstItemValue + secondItemValue)) * 100;
  const secondRate =
    secondItemValue === 0 ? 0 : (secondItemValue / (firstItemValue + secondItemValue)) * 100;
  const isLeftWin = firstItemValue >= secondItemValue;

  return (
    <Wrapper flexDirection="column">
      <Description justifyContent="space-between">
        <Text variant="body3" fontColor={isLeftWin ? theme.colors.primary : theme.colors.gray500}>
          {firstItemText}
        </Text>
        <Text variant="body3" fontColor={!isLeftWin ? theme.colors.primary : theme.colors.gray500}>
          {secondItemText}
        </Text>
      </Description>
      <LeftBar isActive={isLeftWin} rate={firstRate} />
      <RightBar isActive={!isLeftWin} rate={secondRate} />
      <RateWrapper
        variant="body3"
        fontColor={theme.colors.white}
        align={isLeftWin ? 'start' : 'end'}
        isLeft={isLeftWin}
      >
        {isLeftWin ? firstItemValue : secondItemValue}%
      </RateWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  width: 100%;
  height: 24px;
  padding: 8px 16px;
  box-sizing: border-box;
  position: relative;

  background-color: ${({ theme }) => theme.colors.gray50};
  outline: ${({ theme }) => `1px solid ${theme.colors.gray100}`};
  border-radius: 126px;
`;

const Description = styled(Flex)`
  width: 100%;
  position: absolute;
  top: -100%;
  left: 0;
  transform: translateY(-20%);
`;

const LeftBar = styled.div<{ isActive: boolean; rate: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ rate }) => rate}%;
  height: 24px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue400 : theme.colors.gray50};
  border-radius: 126px;
`;

const RightBar = styled.div<{ isActive: boolean; rate: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ rate }) => rate}%;
  height: 24px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue400 : theme.colors.gray50};
  border-radius: 126px;
`;

const RateWrapper = styled(Text)<{ isLeft?: boolean }>`
  width: 100%;
  position: absolute;
  top: 6%;
  z-index: 100;
  left: ${({ isLeft }) => (isLeft ? 'none' : '-16px')};
`;

export default CompetitionBar;

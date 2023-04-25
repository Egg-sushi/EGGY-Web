import styled from '@emotion/styled';

import { Text } from '../common';
import { Flex } from '../styled';
import { useTheme } from '@emotion/react';

interface CompetitionBarProps {
  title: string;
  firstItemText: string;
  firstItemRate: number;
  secondItemText: string;
  secondItemRate: number;
}

function CompetitionBar({
  title,
  firstItemText,
  firstItemRate,
  secondItemText,
  secondItemRate,
}: CompetitionBarProps) {
  const theme = useTheme();
  const isLeftActive = firstItemRate >= secondItemRate;

  return (
    <Flex flexDirection="column" gap={16} textAlign="center">
      <Text variant="body4" color={theme.colors.black} align="center">
        {title}
      </Text>
      <Wrapper justifyContent="space-between">
        <ItemWrapper isLeft>
          <Text
            variant="body5"
            fontColor={isLeftActive ? theme.colors.primary : theme.colors.gray400}
          >
            {firstItemRate}%
          </Text>
          <Text
            variant="body5"
            fontColor={isLeftActive ? theme.colors.primary : theme.colors.gray400}
          >
            {firstItemText}
          </Text>
        </ItemWrapper>
        <Bar>
          <LeftBar isActive={isLeftActive} rate={firstItemRate} />
          <RightBar isActive={!isLeftActive} rate={secondItemRate} />
        </Bar>
        <ItemWrapper>
          <Text
            variant="body5"
            fontColor={!isLeftActive ? theme.colors.primary : theme.colors.gray400}
            align="end"
          >
            {secondItemRate}%
          </Text>
          <Text
            variant="body5"
            fontColor={!isLeftActive ? theme.colors.primary : theme.colors.gray400}
            align="end"
          >
            {secondItemText}
          </Text>
        </ItemWrapper>
      </Wrapper>
    </Flex>
  );
}

const Wrapper = styled(Flex)`
  display: flex;
  box-sizing: border-box;
  height: 12px;
  background: ${({ theme }) => theme.colors.blue50};
  border-radius: 12px;
`;

const LeftBar = styled.div<{ isActive: boolean; rate: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ rate }) => `${rate}%`};
  height: 12px;
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : 'none')};
  border: ${({ rate, theme }) => (rate !== 0 ? `1px solid ${theme.colors.primary}` : 'none')};
  border-radius: ${({ rate }) => `${rate === 100 ? '12px' : '12px 0 0 12px'}`};
`;

const RightBar = styled.div<{ isActive: boolean; rate: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ rate }) => `${rate}%`};
  height: 12px;
  border: ${({ rate, theme }) => (rate !== 0 ? `1px solid ${theme.colors.primary}` : 'none')};
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : 'none')};
  border-radius: ${({ rate }) => `${rate === 100 ? '12px' : '0 12px 12px 0px'}`};
`;

const Bar = styled.div`
  position: relative;
  left: 10px;
  width: calc(100% - 40px);
`;

type IsLeft = { isLeft?: boolean };
const ItemWrapper = styled.div<IsLeft>`
  position: relative;

  & > div {
    position: absolute;
  }

  & > div + div {
    top: 20px;
    white-space: nowrap;
    left: ${({ isLeft }) => (isLeft ? '0px' : 'none')};
    right: ${({ isLeft }) => (isLeft ? '0px' : '-20px')};
  }
`;

export default CompetitionBar;

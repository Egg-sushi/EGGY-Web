import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import type { BaumannResultResponse } from '@/types/api';
import { CompetitionBar, Flex, Text } from '..';

interface Props extends BaumannResultResponse {}

const BAUMANN_TEXT = [
  { title: 'SEBUM', firstItemText: 'Dry', secondItemText: 'Oily', firstType: 'D', secondType: 'O' },
  {
    title: 'SENSITIVE',
    firstItemText: 'Sensitive',
    secondItemText: 'Resistant',
    firstType: 'S',
    secondType: 'R',
  },
  {
    title: 'PIGMENTATION',
    firstItemText: 'Pigment',
    secondItemText: 'Non-pigment',
    firstType: 'P',
    secondType: 'N',
  },
  {
    title: 'WRINKLE',
    firstItemText: 'Wrinkle',
    secondItemText: 'Tight',
    firstType: 'W',
    secondType: 'T',
  },
] as const;

function BaumannPercentResult({ skinType, scores }: Props) {
  const theme = useTheme();

  return (
    <Flex as="section" flexDirection="column" gap={10}>
      <Text variant="body2" fontColor={theme.colors.blue800}>
        Why {skinType} ?
      </Text>
      <FlexWithLine flexDirection="column" gap={16}>
        {BAUMANN_TEXT.map((baumannText) => (
          <CompetitionBar
            key={baumannText.title}
            title={baumannText.title}
            firstItemText={baumannText.firstItemText}
            firstItemRate={scores[baumannText.firstType]}
            secondItemText={baumannText.secondItemText}
            secondItemRate={scores[baumannText.secondType]}
          />
        ))}
      </FlexWithLine>
    </Flex>
  );
}

const FlexWithLine = styled(Flex)`
  & > div:not(:first-of-type) {
    margin-top: 28px;
    padding-top: 16px;
    border-top: ${({ theme }) => `1px solid ${theme.colors.gray200}`};
  }
`;

export default BaumannPercentResult;

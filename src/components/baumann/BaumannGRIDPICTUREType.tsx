import React from 'react';
import styled from '@emotion/styled';

import { Flex } from '../styled';
import Text from '../common/Text';
import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { useTheme } from '@emotion/react';
import { SkeletonImage } from '../common';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
    question: BaumannQuestion['question'];
    imageUrl: BaumannQuestion['imageUrl'];
    answers: BaumannQNA['Baumann_Answer'];
  };
  activeAnswer: BaumannQNA['Baumann_Answer'][number] | null;
  onClickItem: (
    userAnswer: BaumannQNA['Baumann_Answer'][number],
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
}

function BaumannGRIDPICTUREType({ baumann, activeAnswer, onClickItem }: Props) {
  const theme = useTheme();
  const idkAnswer = baumann.answers.slice(4)?.[0];

  return (
    <Wrapper flexDirection="column" gap={54}>
      <Flex flexDirection="column" gap={10}>
        <Text variant="h3" fontColor={theme.colors.gray400}>
          Q4
        </Text>
        <Question variant="h4" fontColor={theme.colors.gray600}>
          {baumann.question}
        </Question>
      </Flex>
      <GridWrapper>
        {baumann.answers.slice(0, 4).map((answer, index) => (
          <Card
            key={answer.id}
            number={index + 1}
            isActive={activeAnswer === answer}
            onClick={(e) => onClickItem(answer, e)}
          >
            <SkeletonImage fill src={answer.imageUrl} alt={answer.answer} height={94} />
            <Text variant="body4" fontColor={theme.colors.black} align="center">
              {answer.answer}
            </Text>
          </Card>
        ))}
        <IDK isActive={activeAnswer === idkAnswer} onClick={(e) => onClickItem(idkAnswer, e)}>
          {idkAnswer.answer}
        </IDK>
      </GridWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)``;

const Question = styled(Text)`
  white-space: pre-line;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-template-areas:
    'card1 card2'
    'card3 card4'
    'footer footer';
`;

const Card = styled.div<{ number: number; isActive: boolean }>`
  grid-area: ${({ number }) => `card${number}`};
  padding-block: 12px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray100}`};
  outline: ${({ isActive, theme }) => (isActive ? `2px solid ${theme.colors.primary}` : 'none')};
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.white};
`;

const IDK = styled.div<{ isActive: boolean }>`
  grid-area: footer;
  padding: 12px 20px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray100}`};
  outline: ${({ isActive, theme }) => (isActive ? `2px solid ${theme.colors.primary}` : 'none')};
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.white};
`;

export default BaumannGRIDPICTUREType;

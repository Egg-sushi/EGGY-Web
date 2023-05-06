import React from 'react';
import styled from '@emotion/styled';

import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { CircleCheckBox, Flex, Text } from '@/components';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
    question: BaumannQuestion['question'];
    answers: BaumannQNA['Baumann_Answer'];
  };
  activeAnswer: BaumannQNA['Baumann_Answer'][0] | null;
  onClickItem: (
    userAnswer: BaumannQNA['Baumann_Answer'][0],
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
}

function BaumannLONGSTRINGType({ baumann, activeAnswer, onClickItem }: Props) {
  return (
    <Flex as={'section'} flexDirection="column" gap={50}>
      <Text variant="body1">{baumann.question}</Text>
      <Flex as={'ul'} flexDirection="column" gap={16}>
        {baumann.answers.map((answer) => (
          <AnswerItem
            as={'li'}
            key={answer.id}
            isActive={answer === activeAnswer}
            onClick={(e) => onClickItem(answer, e)}
          >
            <CircleCheckBox checked={answer === activeAnswer} />
            <StyledText variant="body2" dangerouslySetInnerHTML={{ __html: answer.answer }} />
          </AnswerItem>
        ))}
      </Flex>
    </Flex>
  );
}

type StyleAnswerProps = { isActive: boolean };
const AnswerItem = styled(Flex)<StyleAnswerProps>`
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue100 : theme.colors.blue50};
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.blue150 : theme.colors.blue100};
  }

  &,
  & > div {
    transition: all 0.2s ease-in;
  }

  & > div {
    padding-left: 20px;
    color: ${({ theme, isActive }) => (isActive ? theme.colors.blue500 : theme.colors.gray600)};
  }
`;

const StyledText = styled(Text)`
  span {
    display: inline-block;
    width: 100%;
  }

  strong {
    font-weight: 700;
  }
`;

export default BaumannLONGSTRINGType;

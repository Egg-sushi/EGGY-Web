import React from 'react';
import styled from '@emotion/styled';

import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { CircleCheckBox, Text } from '@/components';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
    question: BaumannQuestion['question'];
    answers: BaumannQNA['Baumann_Answer'];
  };
  activeAnswer: BaumannQNA['Baumann_Answer'][0] | null;
  onClickItem: (
    userAnswer: BaumannQNA['Baumann_Answer'][0],
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => void;
}

function BaumannAType({ baumann, activeAnswer, onClickItem }: Props) {
  return (
    <Wrapper>
      <Text variant="body1">{baumann.question}</Text>
      <AnswerList>
        {baumann.answers.map((answer) => (
          <AnswerItem
            key={answer.id}
            isActive={answer === activeAnswer}
            onClick={(e) => onClickItem(answer, e)}
          >
            <CircleCheckBox checked={answer === activeAnswer} />
            <Text variant="body2">{answer.answer}</Text>
          </AnswerItem>
        ))}
      </AnswerList>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const AnswerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

type StyleAnswerProps = { isActive: boolean };
const AnswerItem = styled.li<StyleAnswerProps>`
  display: flex;
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

export default BaumannAType;

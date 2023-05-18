import React from 'react';
import styled from '@emotion/styled';

import Text from '../common/Text';
import { CircleCheckBox, Flex } from '..';
import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { useTheme } from '@emotion/react';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
    subStepIndex: number;
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
  const theme = useTheme();
  return (
    <Flex as={'section'} flexDirection="column" marginBottom={60}>
      <QuestionIndexText variant="h3" fontColor={theme.colors.gray400}>
        Q{baumann.subStepIndex}
      </QuestionIndexText>
      <QuestionText
        variant="test-question"
        dangerouslySetInnerHTML={{ __html: baumann.question }}
      />
      <Flex as={'ul'} flexDirection="column" gap={'1rem'}>
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
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};

  padding: 1rem 20px;
  border: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.colors.primary}` : `2px solid ${theme.colors.white}`};
  border-radius: 3px;
  box-shadow: 0px 4px 4px
    ${({ isActive }) => (isActive ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.15)')};

  cursor: pointer;

  &:hover {
    border: ${({ isActive, theme }) =>
      isActive ? `2px solid ${theme.colors.blue600}` : `2px solid ${theme.colors.blue500}`};
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

const QuestionText = styled(Text)`
  white-space: pre-line;
  height: calc(3em + 3 * 0.35em); // line-height 고려
  margin-bottom: 1.5rem;

  span {
    display: inline-block;
    width: 100%;
  }

  strong {
    font-weight: 700;
  }
`;

const QuestionIndexText = styled(Text)`
  margin-bottom: 0.5rem;
`;

const StyledText = styled(Text)`
  white-space: pre-line;
  line-height: calc(19 / 16 * 1em);

  span {
    display: inline-block;
    width: 100%;
  }

  strong {
    font-weight: 700;
  }
`;

export default BaumannLONGSTRINGType;

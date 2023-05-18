import React from 'react';
import styled from '@emotion/styled';

import { Flex } from '../styled';
import Text from '../common/Text';
import { SkeletonImage } from '../common';
import FrequencyBar from './FrequencyBar';
import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { useTheme } from '@emotion/react';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
    subStepIndex: number;
    question: BaumannQuestion['question'];
    imageUrl: BaumannQuestion['imageUrl'];
    answers: BaumannQNA['Baumann_Answer'];
  };
  activeAnswer: BaumannQNA['Baumann_Answer'][0] | null;
  onClickItem: (
    userAnswer: BaumannQNA['Baumann_Answer'][0],
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => void;
}

function BaumannPLAINType({ baumann, activeAnswer, onClickItem }: Props) {
  const theme = useTheme();
  return (
    <StyledFlex as={'section'} flexDirection="column">
      <QuestionIndexText variant="h3" fontColor={theme.colors.gray400}>
        Q{baumann.subStepIndex}
      </QuestionIndexText>
      <QuestionText
        variant="test-question"
        dangerouslySetInnerHTML={{ __html: baumann.question }}
      />
      <div style={{ width: '100%' }}>
        <SkeletonImage
          height={180}
          src={baumann.imageUrl}
          alt="quiz-thumbnail"
          fill
          style={{ margin: '0 auto 70px auto' }}
        />
      </div>
      <FrequencyBar
        answers={baumann.answers}
        activeAnswer={activeAnswer}
        onClickItem={onClickItem}
      />
    </StyledFlex>
  );
}

const StyledFlex = styled(Flex)`
  padding-bottom: 60px;
  margin-bottom: 80px;
`;

const QuestionIndexText = styled(Text)`
  margin-bottom: 0.5rem;
`;

const QuestionText = styled(Text)`
  white-space: pre-line;
  height: calc(3em + 3 * 0.35em); // line-height 고려
  margin-bottom: 3rem;

  span {
    display: inline-block;
    width: 100%;
  }

  strong {
    font-weight: 700;
  }
`;

export default BaumannPLAINType;

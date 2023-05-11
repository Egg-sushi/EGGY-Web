import React from 'react';
import styled from '@emotion/styled';

import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { Flex, SkeletonImage, Text } from '..';
import FrequencyBar from './FrequencyBar';

interface Props {
  baumann: {
    id: BaumannQuestion['id'];
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
  return (
    <StyledFlex as={'section'} flexDirection="column">
      <StyledText variant="body1" dangerouslySetInnerHTML={{ __html: baumann.question }} />
      <div style={{ width: '100%' }}>
        <SkeletonImage
          height={180}
          src={baumann.imageUrl}
          alt="quiz-thumbnail"
          fill
          style={{ margin: '30px auto 50px auto' }}
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
`;

const StyledText = styled(Text ?? 'div')`
  white-space: pre-line;

  span {
    display: inline-block;
    width: 100%;
  }

  strong {
    font-weight: 700;
  }
`;

export default BaumannPLAINType;

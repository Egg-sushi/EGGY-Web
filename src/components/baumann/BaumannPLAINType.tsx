import React from 'react';
import styled from '@emotion/styled';

import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { Flex, SkeletonImage, Text } from '@/components';
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
      <Text variant="body1">{baumann.question}</Text>
      <SkeletonImage
        height={180}
        src={baumann.imageUrl || '/Diamond.png'}
        alt="quiz-thumbnail"
        style={{ margin: '30px auto 50px auto' }}
        fill
      />
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

export default BaumannPLAINType;

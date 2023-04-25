import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import type { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { Flex, Text } from '@/components';
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

function BaumannBType({ baumann, activeAnswer, onClickItem }: Props) {
  return (
    <StyledFlex as={'section'} flexDirection="column" paddingBottom="60px">
      <Text variant="body1">{baumann.question}</Text>
      <ImageWrapper>
        <Image width={180} height={180} src={baumann.imageUrl} alt="quiz-thumbnail" />
      </ImageWrapper>
      <FrequencyBar
        answers={baumann.answers}
        activeAnswer={activeAnswer}
        onClickItem={onClickItem}
      />
    </StyledFlex>
  );
}

const ImageWrapper = styled.div`
  margin: 30px auto 50px auto;
`;

const StyledFlex = styled(Flex)`
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default BaumannBType;

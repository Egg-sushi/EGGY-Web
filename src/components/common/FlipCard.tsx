import styled from '@emotion/styled';
import React from 'react';

interface Props {
  front: React.ReactElement;
  back: React.ReactElement;
  isFrontShow: boolean;
  onClick: VoidFunction;
}

function FlipCard(props: Props) {
  const { front, back, isFrontShow, onClick } = props;

  return (
    <CardWrapper>
      <Wrapper isFrontShow={isFrontShow} onClick={onClick} role="button">
        <Card>{front}</Card>
        <Card isBack>{back}</Card>
      </Wrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  perspective: 600px;
`;
type StyleProps = Pick<Props, 'isFrontShow'>;
const Wrapper = styled.div<StyleProps>`
  position: relative;
  cursor: pointer;
  transition: all 1s;
  transform-style: preserve-3d;
  transform: ${({ isFrontShow }) => (isFrontShow ? 'rotateY(0)' : 'rotateY(180deg)')};
`;

const Card = styled.div<{ isBack?: boolean }>`
  width: 100%;
  position: absolute;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: ${({ isBack }) => (isBack ? 'rotateY(-180deg)' : 'rotateY(0)')};
`;

export default FlipCard;

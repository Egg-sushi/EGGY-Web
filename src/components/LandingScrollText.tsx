import styled from '@emotion/styled';

import { Text } from './common';
import { keyframes, useTheme } from '@emotion/react';

const SLOGAN = 'DISCOVER YOUR PERFECT SKIN WITH EGGY';

interface Props {
  row: number;
}

function LandingScrollText({ row, ...restProps }: Props) {
  const theme = useTheme();
  const texts = [...Array(row)].map(() => SLOGAN);

  return (
    <Wrapper {...restProps}>
      {texts.map((text, idx) => (
        <MarQuee key={idx} x={idx * 100} speed={[7, 10, 12, 8, 6][idx]}>
          <AnimationText variant="h1" fontColor={theme.colors.gray400}>
            {text}&nbsp;
          </AnimationText>
          <AnimationText variant="h1" fontColor={theme.colors.gray400}>
            {text}&nbsp;
          </AnimationText>
        </MarQuee>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

const RightToLeft = keyframes`
  from {
    transform: translateX(-30%);
  }
  to {
    transform: translateX(-80%);
  }
`;

type X = { x: number; speed: number };
const MarQuee = styled.div<X>`
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  animation: ${RightToLeft} ${({ speed }) => `${speed}s`} linear infinite;
  position: relative;
  left: ${({ x }) => `${x}px`};
`;

const AnimationText = styled(Text)`
  display: inline-block;
  line-height: 1;
`;

export default LandingScrollText;

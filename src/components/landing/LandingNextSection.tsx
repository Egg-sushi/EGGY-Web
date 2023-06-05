import styled from '@emotion/styled';

import { SkeletonImage, Text } from '../common';
import { useTheme } from '@emotion/react';

const text = `Maybe the cosmetics you are using now have bad ingredients for your skin type. Those habits may have made your skin worse. Let's find out that your cosmetics fit you well!\n(Will my cosmetics fit me well?)`;

function LandingNextSection() {
  const theme = useTheme();
  return (
    <Wrapper>
      <TopPosition>
        <SkeletonImage src="/comming_soon.png" alt="comming_soon-image" />
        <StyledText variant="h2" fontColor={theme.colors.white}>
          COMMING SOON
        </StyledText>
      </TopPosition>
      <BottomPosition>
        <Text variant="h2" align="center">
          NEXT CONTENTS
        </Text>
        <Description variant="body2" align="center">
          {text}
        </Description>
      </BottomPosition>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-inline: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const TopPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100%;
  height: 50%;
`;

const BottomPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 1rem;

  height: 50%;
`;

const StyledText = styled(Text)`
  position: absolute;
`;

const Description = styled(Text)`
  text-align: center;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  line-height: 1.33;
`;

export default LandingNextSection;

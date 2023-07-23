import styled from '@emotion/styled';

import { useTheme } from '@emotion/react';
import { Button, SkeletonImage, Text } from '../common';
import { useLink } from '@/hooks';

function LandingIntroSection() {
  const theme = useTheme();
  const link = useLink();

  return (
    <Wrapper>
      <Text variant="h2" align="center" fontColor={theme.colors.white}>
        JUST ONE TEST <br />
        SWITCH YOUR SKIN
      </Text>
      <SkeletonImage
        src="/saturn.png"
        alt="planet-image"
        objectFit="contain"
        width={500}
        height={300}
      />
      <Text variant="body1" fontColor={theme.colors.white} align="center">
        Find out your skin type through OURNIKS <br />
        You will know how to take care of your skin!
      </Text>
      <StyledButton
        variant="outlined"
        hierarchy="shadow"
        onClick={() => link.to('skinTypeTestIntro')}
      >
        <Text variant="body1" fontColor={theme.colors.primary}>
          Get Started
        </Text>
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 4rem;
  padding-inline: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  position: relative;
  z-index: 2;

  overflow: hidden;
`;

const StyledButton = styled(Button)`
  width: calc(100% - 2rem);
  height: 3.25rem;

  border-radius: 1.5rem;
`;

export default LandingIntroSection;

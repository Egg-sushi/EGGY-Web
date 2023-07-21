import styled from '@emotion/styled';
import { Button, SkeletonImage, Text } from '../common';
import { useTheme } from '@emotion/react';
import { useLink, useScrollFadeIn } from '@/hooks';

function LandingFindFriendSection() {
  const theme = useTheme();
  const link = useLink();
  const fadeIn = useScrollFadeIn();
  return (
    <Wrapper {...fadeIn}>
      <SkeletonImage src="/ufo.png" alt="ufo-image" width={220} />
      <Text variant="h3" fontColor={theme.colors.white} align="center">
        Find a friend who has the same concerns as you!
      </Text>
      <StyledButton
        variant="filled"
        hierarchy="primary"
        onClick={() => link.to('skinTypeTestIntro')}
      >
        <Text variant="body1" fontColor={theme.colors.white}>
          Get Started
        </Text>
      </StyledButton>
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
  align-items: center;
  justify-content: center;
  gap: 80px;

  position: relative;
  z-index: 2;
`;

const StyledButton = styled(Button)`
  width: calc(100% - 2rem);
  height: 3.25rem;

  border-radius: 1.625rem;
`;

export default LandingFindFriendSection;

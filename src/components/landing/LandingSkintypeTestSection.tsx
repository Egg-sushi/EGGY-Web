import styled from '@emotion/styled';

import { useTheme } from '@emotion/react';
import { Button, SkeletonImage, Text } from '../common';
import { useLink } from '@/hooks';
import { Flex } from '../styled';

function LandingSkintypeTestSection() {
  const theme = useTheme();
  const link = useLink();

  return (
    <Wrapper>
      <TopPosition>
        <SkeletonImage src="/peach.png" alt="character-image" objectFit="contain" width={200} />
      </TopPosition>
      <BottomPosition>
        <Flex flexDirection="column" alignItems="center" gap="0.5rem">
          <Text variant="h2" align="center">
            WELCOME
            <br />
            BAUMANN TEST
          </Text>
          <Text variant="body1">CHECK YOUR SKINTYPE</Text>
        </Flex>
        <StyledButton
          variant="outlined"
          hierarchy="shadow"
          onClick={() => link.to('skinTypeTestIntro')}
        >
          <Text variant="h6" fontColor={theme.colors.blue500}>
            Get Started
          </Text>
        </StyledButton>
      </BottomPosition>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 4rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const TopPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50%;
`;

const BottomPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding-block: 4rem;

  background-color: ${({ theme }) => theme.colors.blue50};
  height: 50%;
`;

const StyledButton = styled(Button)`
  width: 12rem;
  height: 3rem;

  border-radius: 1.5rem;
`;

export default LandingSkintypeTestSection;

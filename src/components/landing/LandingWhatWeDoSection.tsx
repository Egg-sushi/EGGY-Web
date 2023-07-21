import styled from '@emotion/styled';

import { ScrollFadeIn, SkeletonImage, Text } from '../common';
import { useTheme } from '@emotion/react';
import { Flex } from '../styled';

function LandingWhatWeDoSection() {
  const theme = useTheme();
  return (
    <ScrollFadeIn>
      <Wrapper>
        <Card>
          <SkeletonImage src="/scientist.png" alt="scientist" width={160} />
          <Flex flexDirection="column" gap={20} alignItems="center">
            <Text variant="h2" fontColor={theme.colors.white}>
              What we do!
            </Text>
            <Text variant="body1" fontColor={theme.colors.white}>
              We provide optimized information for your skin using the Baumann test, which
              categorizes skin types into 16 types.
            </Text>
          </Flex>
        </Card>
      </Wrapper>
    </ScrollFadeIn>
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

  position: relative;
  z-index: 1;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 72px 28px;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.colors.gray200};

  border-radius: 20px;
  background: linear-gradient(315deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.12) 100%);
  backdrop-filter: blur(15px);
`;

export default LandingWhatWeDoSection;

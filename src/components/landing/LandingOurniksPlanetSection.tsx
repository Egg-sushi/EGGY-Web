import styled from '@emotion/styled';
import { SkeletonImage, Text } from '../common';
import { useTheme } from '@emotion/react';
import { useScrollFadeIn } from '@/hooks';

function LandingOurniksPlanetSection() {
  const theme = useTheme();
  const fadeIn = useScrollFadeIn();
  return (
    <Wrapper {...fadeIn}>
      <ImageWrapper>
        <SkeletonImage src="/planet.png" alt="planet-image" width={400} />
      </ImageWrapper>
      <TextWrapper>
        <Text variant="h2" fontColor={theme.colors.white}>
          OURNIKS PLANET
        </Text>
        <Text variant="body1" fontColor={theme.colors.white} align="center">
          There are 16 friends on this planet who have their own personalities and charms. These
          cute friends have different skin complexes. They all want to get their healthy skin back.
        </Text>
      </TextWrapper>
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

  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: absolute;
  transform: translateY(-60px);
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transform: translateY(160px);
`;

export default LandingOurniksPlanetSection;

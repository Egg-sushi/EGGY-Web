import styled from '@emotion/styled';

import { css, keyframes } from '@emotion/react';
import { SkeletonImage } from '../common';
import { Flex } from '../styled';
import { useScrollFadeIn } from '@/hooks';

const line1 = ['DSNW', 'ORNT', 'OSNW', 'DSNT', 'DRNW'];
const line2 = ['DRNT', 'DRPT', 'ORPT', 'OSPW', 'DSPT', 'OSPT'];
const line3 = ['ORNW', 'OSNT', 'ORPW', 'DRPW', 'DSPW'];

const speed = 10;

function LandingCharacterSection() {
  const fadeIn = useScrollFadeIn();
  return (
    <Wrapper {...fadeIn}>
      <MarQuee direction="left" speed={speed}>
        <AnimationWrapper>
          {line1.map((skintype) => (
            <ProductImage
              key={skintype}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
        <AnimationWrapper>
          {line1.map((skintype) => (
            <ProductImage
              key={`${skintype}-after`}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
      </MarQuee>
      <MarQuee direction="right" speed={speed}>
        <AnimationWrapper>
          {line2.map((skintype) => (
            <ProductImage
              key={skintype}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
        <AnimationWrapper>
          {line2.map((skintype) => (
            <ProductImage
              key={`${skintype}-after`}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
      </MarQuee>
      <MarQuee direction="left" speed={speed}>
        <AnimationWrapper>
          {line3.map((skintype) => (
            <ProductImage
              key={skintype}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
        <AnimationWrapper>
          {line3.map((skintype) => (
            <ProductImage
              key={`${skintype}-after`}
              src={`/${skintype}_Silhouette.png`}
              alt={`${skintype}_Silhouette`}
              width={140}
              height={140}
            />
          ))}
        </AnimationWrapper>
      </MarQuee>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  overflow: hidden;
  position: relative;
  z-index: 2;
`;

const ProductImage = styled(SkeletonImage)`
  overflow: hidden;

  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: linear-gradient(315deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.12) 100%);
`;

const RightToLeft = keyframes`
  from {
    transform: translateX(-30%);
  }
  to {
    transform: translateX(calc(20% + 10px));
  }
`;

const LeftToRight = keyframes`
  from {
    transform: translateX(calc(20% + 10px));
  }
  to {
    transform: translateX(-30%);
  }
`;

type MarQueeProps = { direction: 'left' | 'right'; speed: number };
const MarQuee = styled.div<MarQueeProps>`
  display: flex;
  gap: 20px;
  animation: ${({ direction, speed }) =>
    css`
      ${direction === 'left' ? RightToLeft : LeftToRight} linear ${speed}s infinite
    `};
`;

const AnimationWrapper = styled(Flex)`
  gap: 20px;
`;

export default LandingCharacterSection;

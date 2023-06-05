import styled from '@emotion/styled';

import { css, keyframes, useTheme } from '@emotion/react';
import { Button, SkeletonImage, Text } from '../common';
import { useLink } from '@/hooks';
import { Flex } from '../styled';

const text = `Maybe the cosmetics you are using now have bad ingredients for your skin type. Those habits may have made your skin worse. Let's find out that your cosmetics fit you well!\n(Will my cosmetics fit me well?)`;

function LandingCosmeticSection() {
  const theme = useTheme();
  const link = useLink();

  return (
    <Wrapper>
      <TopPosition>
        <MarQuee direction="left" speed={6}>
          <AnimationWrapper>
            {Array.from({ length: 3 }).map((_, idx) => (
              <ProductImage
                key={idx}
                src="/product.jpeg"
                alt="product-image"
                width={120}
                height={120}
              />
            ))}
          </AnimationWrapper>
          <AnimationWrapper>
            {Array.from({ length: 3 }).map((_, idx) => (
              <ProductImage
                key={idx}
                src="/product.jpeg"
                alt="product-image"
                width={120}
                height={120}
              />
            ))}
          </AnimationWrapper>
        </MarQuee>
        <MarQuee direction="right" speed={6}>
          <AnimationWrapper>
            {Array.from({ length: 3 }).map((_, idx) => (
              <ProductImage
                key={idx}
                src="/product.jpeg"
                alt="product-image"
                width={120}
                height={120}
              />
            ))}
          </AnimationWrapper>
          <AnimationWrapper>
            {Array.from({ length: 3 }).map((_, idx) => (
              <ProductImage
                key={idx}
                src="/product.jpeg"
                alt="product-image"
                width={120}
                height={120}
              />
            ))}
          </AnimationWrapper>
        </MarQuee>
      </TopPosition>
      <BottomPosition>
        <Text variant="h2" align="center">
          LOOK FOR
          <br />
          YOUR COSMETICS
        </Text>
        <Description variant="body2" align="center">
          {text}
        </Description>
        <StyledButton variant="outlined" hierarchy="shadow" onClick={() => link.to('products')}>
          <Text variant="h6" fontColor={theme.colors.blue500}>
            Matching
          </Text>
        </StyledButton>
      </BottomPosition>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 4rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const TopPosition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  overflow: hidden;
  height: 50%;
`;

const BottomPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 1rem;

  height: 50%;
  padding-inline: 20px;
`;

const ProductImage = styled(SkeletonImage)`
  border-radius: 15px;
  overflow: hidden;
`;

const Description = styled(Text)`
  text-align: center;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  line-height: 1.33;
`;

const StyledButton = styled(Button)`
  position: absolute;
  width: 12rem;
  height: 3rem;

  border-radius: 1.5rem;
  bottom: 4rem;
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

export default LandingCosmeticSection;

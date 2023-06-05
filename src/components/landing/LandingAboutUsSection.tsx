import styled from '@emotion/styled';
import { SkeletonImage, Text } from '../common';

const text = `Maybe the cosmetics you are using Those habits may have made your\n(Will my cosmetics fit me well?)`;

function LandingAboutUsSection() {
  return (
    <Wrapper>
      <Text variant="h2">EGGY?</Text>
      <Description variant="body2">{text}</Description>
      <StyledSkeletonImage src="/peach.png" alt="character-image" objectFit="contain" width={180} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 40px);
  height: calc(100vh - 7rem);
  margin: 3.5rem 20px;
  padding: 3rem 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  background-color: ${({ theme }) => theme.colors.blue100};
`;

const Description = styled(Text)`
  letter-spacing: -0.5px;
  text-transform: uppercase;
  line-height: 1.33;
`;

const StyledSkeletonImage = styled(SkeletonImage)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

export default LandingAboutUsSection;

import styled from '@emotion/styled';

import { Text } from '../common';

const text = `There are 16 different characters living together on the Eggy planet. Everyone looks cute and perfect. But they have different skin complexes.. Each of them has their own complexes, but they all have one thing in common: they want to regain healthy skin! Can all these 16 cute characters get their healthy skin back? Let's find a character that suits your skin type!\n(Let’s discover our skin type!)`;

function LandingAboutSkintypeTestSection() {
  return (
    <Wrapper>
      <TopPosition>
        <Title variant="h1" weight={800}>
          BAU
          <br />
          MANN
        </Title>
      </TopPosition>
      <BottomPosition>
        <Text variant="h2" align="center">
          WHO WE ARE?
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

const Title = styled(Text)`
  font-size: 128px;
  line-height: 1;
`;

const Description = styled(Text)`
  text-align: center;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  line-height: 1.33;
`;

export default LandingAboutSkintypeTestSection;

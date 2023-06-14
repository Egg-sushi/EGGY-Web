import React from 'react';
import styled from '@emotion/styled';
import { Lottie } from '@toss/lottie';

interface Props {}

function FullCoverSpinner(props: Props) {
  const {} = props;

  return (
    <Wrapper>
      <Lottie src="/lotties/spinner.json" width={160} height={160} speed={1} loop />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 99999;

  background-color: rgba(0, 0, 0, 0.5);
`;

export default FullCoverSpinner;

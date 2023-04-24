import styled from '@emotion/styled';
import React from 'react';
import Text from './Text';
import { Flex } from '../styled';
import { useTheme } from '@emotion/react';

interface Props {
  stepCurIdx: number;
  stepNames: string[];
  title: string;
  currentSubStep: number;
  totalSubStep: number;
}
function ProgressBar(props: React.PropsWithChildren<Props>) {
  const { stepCurIdx, stepNames, title, currentSubStep, totalSubStep, ...restProps } = props;
  const stepNum = stepNames.length;

  const theme = useTheme();

  return (
    <Flex width="100%" flexDirection="column" alignItems="center" {...restProps}>
      <Title variant="h3">{title}</Title>
      <SubTitle variant="h6">
        <b>{currentSubStep}</b>/{totalSubStep}
      </SubTitle>
      <Wrapper>
        <StatusBar width={`${(100 / stepNum) * (stepNum - 1)}%`}>
          <CurrentStatusBar width={`${(100 / (stepNum - 1)) * stepCurIdx}%`} />
        </StatusBar>
        <StepWrapper>
          {stepNames.map((name, idx) => (
            <Step
              key={idx}
              width={`${100 / stepNum}%`}
              isVisited={idx <= stepCurIdx}
              isCurrent={idx === stepCurIdx}
            >
              <StyledText
                variant="body4"
                color={idx <= stepCurIdx ? theme.colors.primary : theme.colors.gray400}
              >
                {name}
              </StyledText>
            </Step>
          ))}
        </StepWrapper>
      </Wrapper>
    </Flex>
  );
}

const Title = styled(Text)`
  height: 2.25rem;
  font-weight: 400;
`;

const SubTitle = styled(Text)`
  font-weight: 600;
  padding-top: 0.5rem;
  b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

interface StyleProps {
  width: React.CSSProperties['width'];
  isVisited?: boolean;
  isCurrent?: boolean;
}
const StatusBar = styled.div<StyleProps>`
  height: 2px;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  background: ${({ theme }) => theme.colors.gray200};
  position: relative;
  top: 20px;

  margin: 0 auto;
`;

const CurrentStatusBar = styled.div<StyleProps>`
  height: 2px;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  border-radius: 1px;
  background: ${({ theme }) => theme.colors.primary};

  transition: width 1000ms linear 0s;
`;

const StepWrapper = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;
`;

const StyledText = styled(Text)`
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
`;

const Step = styled.li<StyleProps>`
  display: inline-block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  padding-top: 35px;
  position: relative;

  transition: color 0.5s linear 1s;

  &:before {
    content: ' ';
    position: absolute;
    top: ${({ isCurrent }) => (isCurrent ? '12px' : '14px')};
    left: ${({ isCurrent }) => (isCurrent ? 'calc(50% - 7px)' : 'calc(50% - 5px)')};
    z-index: 1;
    width: 10px;
    max-width: 10px;
    height: 10px;

    border-radius: 7px;
    background: ${({ isVisited, theme }) =>
      isVisited ? theme.colors.primary : theme.colors.gray200};

    transition: background 0.5s linear 1s;

    ${({ isCurrent, theme }) =>
      isCurrent ? `border: 2px solid #fff; box-shadow: 0 0 0 1px ${theme.colors.primary}` : ''}
  }
`;

export default ProgressBar;

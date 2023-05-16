import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { Flex } from '../styled';
import { Icon, Text } from '../common';
import { GetComponentProps } from '@/utils';
import { Lottie } from '@toss/lottie';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  title: string;
  currentStepIndex: number;
  currentSubStepIndex: number;
  totalSubStepNum: number;
}
function ProgressBar(props: React.PropsWithChildren<Props>) {
  const { title, currentStepIndex, currentSubStepIndex, totalSubStepNum, ...restProps } = props;
  const stepNum = 4;
  const progressSubStep = (currentSubStepIndex - 1) / totalSubStepNum;

  return (
    <Flex width="100%" flexDirection="column" alignItems="center" {...restProps}>
      <Wrapper>
        <StatusBar>
          <CurrentStatusBar width={`${(100 / (stepNum - 1)) * currentStepIndex}%`} />
        </StatusBar>

        <StepStack>
          <Step
            stepIndex={0}
            progressSubStep={progressSubStep}
            currentStepIndex={currentStepIndex}
            title="SEBUM"
            iconType="sebum"
          />
          <Step
            stepIndex={1}
            progressSubStep={progressSubStep}
            currentStepIndex={currentStepIndex}
            title="SENSITIVITY"
            iconType="sensitivity"
          />
          <Step
            stepIndex={2}
            progressSubStep={progressSubStep}
            currentStepIndex={currentStepIndex}
            title="PIGMENTATION"
            iconType="pigmentation"
          />
          <Step
            stepIndex={3}
            progressSubStep={progressSubStep}
            currentStepIndex={currentStepIndex}
            title="WRINKLE"
            iconType="wrinkle"
          />
        </StepStack>
      </Wrapper>
    </Flex>
  );
}

type StepProps = Pick<Props, 'currentStepIndex'> & {
  progressSubStep: number;
  stepIndex: number;
  title: string;
  iconType: GetComponentProps<typeof Icon>['type'];
};
const Step = ({ currentStepIndex, progressSubStep, stepIndex, title, iconType }: StepProps) => {
  const theme = useTheme();
  const fillCircumference = CIRCUMFERENCE * progressSubStep;
  const isCurrent = currentStepIndex === stepIndex;
  const isPassed = currentStepIndex > stepIndex;
  return (
    <StepWrapper>
      {isPassed ? (
        <LottieWrapper>
          <Lottie src="/lotties/check.json" width={45} height={45} speed={1.5} />
        </LottieWrapper>
      ) : (
        <>
          <StepCircle
            type="circleProgress"
            width={62}
            height={62}
            strokeDashoffset={isCurrent ? fillCircumference : 0}
            strokeDasharray={CIRCUMFERENCE}
          />
          <StepIcon
            type={iconType}
            width={36}
            height={36}
            fill={currentStepIndex >= stepIndex ? theme.colors.primary : theme.colors.gray200}
          />
        </>
      )}

      <StepTitle
        variant={currentStepIndex >= stepIndex ? 'h8' : 'body4'}
        fontColor={currentStepIndex >= stepIndex ? theme.colors.primary : theme.colors.gray300}
      >
        {title}
      </StepTitle>
    </StepWrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 8px 20px;
  box-sizing: border-box;
`;

interface StyleProps {
  width?: React.CSSProperties['width'];
  isVisited?: boolean;
  isCurrent?: boolean;
}
const StatusBar = styled.div`
  height: 2px;
  width: calc(100% - (0.75rem * 3));
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

  transition: width 1s linear 0s;
`;

const StepStack = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 0;
  list-style: none;

  display: flex;
  justify-content: space-between;
`;

const StepWrapper = styled.li`
  position: relative;
  top: -12px;
`;

const StepCircle = styled(Icon)`
  transform: rotate(-90deg);

  transition: all 0.2s ease-in-out;
`;

const StepIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  & > path {
    transition: all 0.3s ease-in-out 0.7s;
  }
`;

const StepTitle = styled(Text)`
  position: absolute;
  left: 50%;
  top: calc(100% + 11px);
  transform: translateX(-50%);

  line-height: 1.4;

  transition: all 0.3s ease-in-out 0.7s;
`;

const LottieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 62px;
  height: 62px;

  ::before {
    position: absolute;
    content: '';
    width: 25.67px;
    height: 25.67px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export default ProgressBar;

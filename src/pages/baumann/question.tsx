import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { DUMMY_BAUMANN_B } from '@/dummy/baumann';
import { BaumannQNA, BaumannQuestion, UserAnswer } from '@/types/baumann';
import { BaumannAType, BaumannBType, Button, Flex, Icon, Text } from '@/components';
import ProgressBar from '@/components/common/ProgressBar';

const QNAComponentsByType = {
  A: BaumannAType,
  B: BaumannBType,
} as const;

export default function BaumannTest() {
  const theme = useTheme();
  const [userAnswer, setUserAnswer] = React.useState<UserAnswer[]>([]);
  const [activeAnswer, setActiveAnswer] = React.useState<BaumannQNA['Baumann_Answer'][0] | null>(
    null,
  );
  const [stepIdx, setStepIdx] = React.useState<number>(0);
  const BaumannQNAComponent = QNAComponentsByType[DUMMY_BAUMANN_B.questionType]; // 현재 타입에 따른 바우만 컴포넌트

  const stopSyntheticEvent = React.useCallback((e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClickAnswerItem = React.useCallback(
    (answer: BaumannQNA['Baumann_Answer'][0], e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      stopSyntheticEvent(e);
      if (activeAnswer === answer) {
        setActiveAnswer(null);
      } else {
        setActiveAnswer(answer);
      }
    },
    [activeAnswer, stopSyntheticEvent],
  );

  const handleClickPrev = React.useCallback(() => {
    setStepIdx((prev) => prev - 1);
    if (userAnswer.length === 0) {
      return;
    }
    setUserAnswer((prev) => prev.slice(0, -1));
    setActiveAnswer(null);
  }, [userAnswer.length]);

  const handleClickNext = React.useCallback(() => {
    setStepIdx((prev) => prev + 1);
    if (activeAnswer == null) {
      return;
    }
    setUserAnswer((prev) => [
      ...prev,
      { questionId: DUMMY_BAUMANN_B.id, answerId: activeAnswer.id },
    ]);
    setActiveAnswer(null);
  }, [activeAnswer]);

  React.useEffect(() => {
    console.log(userAnswer);
  }, [userAnswer]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledProgressBar
        stepCurIdx={stepIdx}
        title="SEBUM"
        currentSubStep={4}
        totalSubStep={15}
        stepNames={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
      <Content questionType={DUMMY_BAUMANN_B.questionType as BaumannQuestion['questionType']}>
        <BaumannQNAComponent
          baumann={{
            id: DUMMY_BAUMANN_B.id,
            question: DUMMY_BAUMANN_B.question,
            answers: DUMMY_BAUMANN_B.Baumann_Answer,
            imageUrl: DUMMY_BAUMANN_B.imageUrl,
          }}
          activeAnswer={activeAnswer}
          onClickItem={handleClickAnswerItem}
        />
        <BottomPosition>
          <Flex justifyContent="space-between" gap="16px">
            <Button
              variant="outlined"
              Icon={<Icon fill={theme.colors.primary} type="leftArrow" width={14} height={14} />}
              onClick={handleClickPrev}
            >
              <Text variant="body2" color={theme.colors.primary}>
                Prev
              </Text>
            </Button>
            <Button
              variant="filled"
              Icon={<Icon type="rightArrow" width={14} height={14} />}
              onClick={handleClickNext}
              iconPosition="end"
            >
              <Text variant="body2" color={theme.colors.white}>
                Next
              </Text>
            </Button>
          </Flex>
        </BottomPosition>
      </Content>
    </>
  );
}

const StyledProgressBar = styled(ProgressBar)`
  padding: 1rem 0;
`;

const Content = styled.div<{ questionType: BaumannQuestion['questionType'] }>`
  padding-top: 40px;
  padding-inline: 20px;
  height: calc(100% - 160px);
  background-color: ${({ theme, questionType }) => questionType === 'B' && theme.colors.blue50};
`;

const BottomPosition = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: 50px;
`;

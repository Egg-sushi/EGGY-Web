import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { DUMMY_BAUMANN_B } from '@/dummy/baumann';
import { BaumannQNA, BaumannQuestion } from '@/types/baumann';
import { Button, Flex, Icon, Text } from '@/components';
import ProgressBar from '@/components/common/ProgressBar';
import { getAnswers, saveAnswer, resetAnswers } from '@/utils/baumann';
import useBaumann from '@/hooks/useBaumann';

export default function BaumannTest() {
  const theme = useTheme();
  const [activeAnswer, setActiveAnswer] = React.useState<BaumannQNA['Baumann_Answer'][0] | null>(
    null,
  );
  const [currentQnaIndex, setCurrentQnaIndex] = React.useState<number>(0);
  const topRef = React.useRef<HTMLDivElement>(null);

  const {
    prevQna,
    currentQna,
    nextQna,
    BaumannQNAComponent,
    currentSubStepIndex,
    totalSubStepNum,
    currentStepIndex,
    qnaType,
    qnaSize,
  } = useBaumann(currentQnaIndex);

  const isLastQna = currentQnaIndex === qnaSize - 1;

  const handleScrollToTop = () => {
    if (topRef?.current) {
      const topElement = topRef.current as HTMLDivElement;
      topElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

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
    if (currentQnaIndex <= 0) {
      return;
    }

    if (activeAnswer) {
      saveAnswer({ questionId: currentQna.id, answerId: activeAnswer.id });
    }

    const savedPrevAnswer = getAnswers()[prevQna.id];
    const prevAnswer = prevQna.Baumann_Answer.find((answer) => answer.id === savedPrevAnswer);

    setCurrentQnaIndex((prev) => prev - 1);

    if (prevAnswer) {
      setActiveAnswer(prevAnswer);
    } else {
      setActiveAnswer(null);
    }
  }, [activeAnswer, currentQna, currentQnaIndex, prevQna]);

  const handleClickNext = React.useCallback(() => {
    if (!activeAnswer) {
      return;
    }

    saveAnswer({ questionId: currentQna.id, answerId: activeAnswer.id });

    if (isLastQna) {
      console.log(getAnswers());
      console.log('검사 끝');
      return;
    }

    const savedNextAnswer = getAnswers()[nextQna.id];
    const nextAnswer = nextQna.Baumann_Answer.find((answer) => answer.id === savedNextAnswer);

    setCurrentQnaIndex((prev) => prev + 1);

    if (nextAnswer) {
      setActiveAnswer(nextAnswer);
    } else {
      setActiveAnswer(null);
    }
  }, [activeAnswer, currentQna, isLastQna, nextQna]);

  React.useEffect(() => {
    resetAnswers();
  }, []);

  React.useEffect(() => {
    handleScrollToTop();
  }, [currentQnaIndex]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopRef ref={topRef} />
      <StyledProgressBar
        currentStepIndex={currentStepIndex}
        title={currentQna.type}
        currentSubStepIndex={currentSubStepIndex}
        totalSubStepNum={totalSubStepNum}
        stepNames={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
      <Content questionType={qnaType}>
        <BaumannQNAComponent
          baumann={{
            id: currentQna.id,
            question: currentQna.question,
            answers: currentQna.Baumann_Answer,
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
              <Text variant="body2" fontColor={theme.colors.primary}>
                Prev
              </Text>
            </Button>
            <Button
              variant="filled"
              Icon={<Icon type="rightArrow" fill={theme.colors.white} width={14} height={14} />}
              onClick={handleClickNext}
              iconPosition="end"
            >
              <Text variant="body2" fontColor={theme.colors.white}>
                {isLastQna ? 'End' : 'Next'}
              </Text>
            </Button>
          </Flex>
        </BottomPosition>
      </Content>
    </>
  );
}

const TopRef = styled.div``;

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
  padding: 50px 0;
  bottom: 50px;
`;

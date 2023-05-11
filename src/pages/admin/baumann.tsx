import React from 'react';
import styled from '@emotion/styled';
import type { GetServerSideProps } from 'next/types';

import { Button, Flex, SelectOption, SkeletonImage, Tag, Text } from '@/components';
import { BaumannImage, BaumannQNA } from '@/types/baumann';
import { BaumannService } from '@/api/service';
import { keyframes } from '@emotion/react';

interface Props {
  baumanns: BaumannQNA[];
}

const initialBaumannQNA: BaumannQNA = {
  id: -1,
  question: '',
  type: 'SEBUM',
  questionType: 'PLAIN',
  imageUrl: '',
  Baumann_Answer: [],
};

export default function BaumannEditPage({ baumanns }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentBaumannQNA, setCurrentBaumannQNA] = React.useState<BaumannQNA>(initialBaumannQNA);

  const handleChangeUpload = React.useCallback(
    async (image: File, type: BaumannImage['type'], id: number) => {
      if (type && id) {
        setIsLoading(true);
        const res = await BaumannService.modifyBaumannQNAImage({ type, image, id });
        if (res.type === 'question') {
          setCurrentBaumannQNA((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
        } else if (res.type === 'answer') {
          setCurrentBaumannQNA((prev) => {
            const nextBaumannAnswers = [...prev.Baumann_Answer];
            const index = nextBaumannAnswers.findIndex((baumann) => baumann.id === res.data.id);
            nextBaumannAnswers[index].imageUrl = res.data.imageUrl;
            return { ...prev, Baumann_Answer: nextBaumannAnswers };
          });
        }
        setIsLoading(false);
      }
    },
    [],
  );

  const handleChangeQuestion = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (currentBaumannQNA && file) {
        handleChangeUpload(file, 'question', currentBaumannQNA.id);
      } else {
        setCurrentBaumannQNA((prev) => ({ ...prev, question: e.target.value }));
      }
    },
    [currentBaumannQNA, handleChangeUpload],
  );

  const handleChangeAnswer = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const file = e.target.files?.[0];
      if (currentBaumannQNA && file) {
        handleChangeUpload(file, 'answer', currentBaumannQNA.Baumann_Answer[index].id);
      } else {
        setCurrentBaumannQNA((prev) => {
          const nextBaumannAnswers = [...prev.Baumann_Answer];
          nextBaumannAnswers[index].answer = e.target.value;
          return { ...prev, Baumann_Answer: nextBaumannAnswers };
        });
      }
    },
    [currentBaumannQNA, handleChangeUpload],
  );

  const handleChangeType = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBaumannQNA((prev) => ({
      ...prev,
      questionType: e.target.value as BaumannQNA['questionType'],
    }));
  }, []);

  const handleClickBaumannId = React.useCallback(
    (baumann: BaumannQNA) => {
      if (currentBaumannQNA === baumann) {
        setCurrentBaumannQNA(initialBaumannQNA);
      } else {
        setCurrentBaumannQNA(baumann);
      }
    },
    [currentBaumannQNA],
  );

  const saveBaumann = React.useCallback(async () => {
    const res = await BaumannService.modifyBaumannQNA(currentBaumannQNA);
    setCurrentBaumannQNA(res);
  }, [currentBaumannQNA]);

  return (
    <Wrapper flexDirection="column" justifyContent="space-evenly" isLoading={isLoading}>
      <Text variant="h2">EGGY 질문지 수정</Text>
      <Flex gap={4} flexWrap="wrap">
        {baumanns.map((baumann) => (
          <Tag
            key={baumann.id}
            text={`${baumann.id}`}
            size="md"
            hierarchy={currentBaumannQNA?.id === baumann.id ? 'primary' : 'gray'}
            onClick={() => handleClickBaumannId(baumann)}
          />
        ))}
      </Flex>
      {isLoading && <Spinner />}
      <Flex flexDirection="column" gap={12}>
        <Flex gap={8} style={{ marginTop: 12 }}>
          <Text variant="h5">질문: </Text>
          <input
            value={currentBaumannQNA?.question ?? ''}
            onChange={handleChangeQuestion}
            style={{ flex: 1 }}
          />
        </Flex>
        <Flex gap={8}>
          <Text variant="h5">질문지 타입: </Text>
          <SelectOption
            value={currentBaumannQNA?.questionType}
            optionList={['PLAIN', 'LONG_STRING', 'GRID_PICTURE']}
            onChange={handleChangeType}
          />
        </Flex>
        <Flex alignItems="center" gap={8}>
          <Text variant="h5">질문지 이미지: </Text>
          <input type="file" accept="image/*" onChange={handleChangeQuestion} />
          <SkeletonImage
            src={currentBaumannQNA?.imageUrl || '/Diamond2.png'}
            alt="image"
            width={144}
            height={120}
          />
        </Flex>
        <Text variant="h5">답변:</Text>
        <Flex flexDirection="column" gap={12}>
          {currentBaumannQNA?.Baumann_Answer.map((answer, index) => (
            <Flex key={answer.id} alignItems="center">
              <Flex flexDirection="column" gap={16}>
                <input
                  value={answer.answer ?? ''}
                  onChange={(e) => handleChangeAnswer(e, index)}
                  style={{ flex: 1, height: 30 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChangeAnswer(e, index)}
                />
              </Flex>
              <SkeletonImage
                src={answer.imageUrl || '/Diamond2.png'}
                alt="image"
                width={144}
                height={120}
              />
            </Flex>
          ))}
        </Flex>
        <Button variant="filled" hierarchy="primary" style={{ width: 500 }} onClick={saveBaumann}>
          수정하기
        </Button>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled(Flex)<{ isLoading: boolean }>`
  max-width: 1080px;
  margin: 40px auto;
  position: relative;
  background-color: ${({ isLoading }) => (isLoading ? '#e9e9e9' : 'transparent')};
`;

const spinnerKeyFrames = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #f19022;
  border-bottom-color: #f19022;
  z-index: 999;
  opacity: 1;
  animation: ${spinnerKeyFrames} 0.8s ease infinite;
`;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // TODO: 관리자 유효성 검사 후 실패시 리디렉션
  try {
    const data = await BaumannService.questions();

    return {
      props: {
        baumanns: data,
      },
    };
  } catch (error) {
    return {
      props: {
        baumanns: [],
      },
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};

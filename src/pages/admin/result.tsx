import React from 'react';
import styled from '@emotion/styled';
import type { GetServerSideProps } from 'next/types';

import { Button, Flex, SkeletonImage, Tag, Text } from '@/components';
import { SkinType } from '@/types/baumann';
import { BaumannService } from '@/api/service';
import { keyframes } from '@emotion/react';
import { BaumannResultResponse } from '@/types/api';
import TipService from '@/api/service/TipService';
import skinTypeService from '@/api/service/SkinTypeService';
import tipService from '@/api/service/TipService';

interface Props {
  results: Omit<BaumannResultResponse, 'percents'>[];
}

const initialBaumanResult: Omit<BaumannResultResponse, 'percents'> = {
  type: 'DSPW',
  tips: [],
  info: {
    id: -1,
    title: 'DSPW',
    description: '',
    characterName: '',
    hashTags: '',
  },
};

export default function AdminResultPage({ results }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentResult, setCurrentResult] =
    React.useState<Omit<BaumannResultResponse, 'percents'>>(initialBaumanResult);

  const handleClickModifyInfo = React.useCallback(async () => {
    try {
      await skinTypeService.modifySkinType(currentResult.info);
      alert('success');
    } catch (err) {
      alert('error');
    }
  }, [currentResult.info]);

  const handleClickModifyTip = React.useCallback(
    async (id: number) => {
      try {
        const targetTip = currentResult.tips.find((tip) => tip.id === id)!;
        await tipService.modifyTip({ ...targetTip });
        alert('success');
      } catch (err) {
        alert('error');
      }
    },
    [currentResult.tips],
  );

  const handleClickResultTypeName = React.useCallback(
    (type: SkinType) => {
      const nextResult = results.find((result) => result.type === type);
      if (nextResult) {
        setCurrentResult(nextResult);
      }
    },
    [results],
  );

  const handleChangeUpload = React.useCallback(async (image: File, tipId: number) => {
    if (tipId) {
      setIsLoading(true);
      console.log(image, tipId);
      const res = await TipService.modifyTipImage({ image, id: tipId });
      console.log(res);
      setIsLoading(false);
      return res;
    }
  }, []);

  const handleChangeTip = React.useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      type: 'title' | 'description' | 'imageUrl',
    ) => {
      const file = e.target.files?.[0];
      if (file && currentResult) {
        const url = await handleChangeUpload(file, currentResult.tips[index].id);
        setCurrentResult((prev) => {
          const nextTips = [...prev.tips];
          nextTips[index].imageUrl = url?.imageUrl ?? '';
          return { ...prev, tips: nextTips };
        });
      } else {
        setCurrentResult((prev) => {
          const nextTips = [...prev.tips];
          nextTips[index][type] = e.target.value;
          return { ...prev, tips: nextTips };
        });
      }
    },
    [currentResult, handleChangeUpload],
  );

  const handleChangeInfo = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: keyof (typeof initialBaumanResult)['info']) => {
      setCurrentResult((prev) => {
        const nextInfo = { ...prev.info, [type]: e.target.value };
        return { ...prev, info: nextInfo };
      });
    },
    [],
  );

  return (
    <Wrapper flexDirection="column" justifyContent="space-evenly" isLoading={isLoading}>
      <Text variant="h2">EGGY 결과지 수정</Text>
      <Flex gap={4} flexWrap="wrap">
        {results.map((result) => (
          <Tag
            key={result.type}
            text={`${result.type}`}
            size="md"
            hierarchy={currentResult?.type === result.type ? 'primary' : 'gray'}
            onClick={() => handleClickResultTypeName(result.type)}
          />
        ))}
      </Flex>
      {isLoading && <Spinner />}
      <Flex flexDirection="column" gap={12}>
        <Flex gap={8} style={{ marginTop: 12 }}>
          <Text variant="h5">타입: {currentResult?.type}</Text>
        </Flex>
        <Text variant="h5">팁:</Text>
        <Flex flexDirection="column" gap={12}>
          {currentResult?.tips.map((tip, index) => (
            <Flex key={tip.id} flexDirection="column" gap={4} marginTop={8}>
              제목
              <input
                value={tip.title ?? ''}
                onChange={(e) => handleChangeTip(e, index, 'title')}
                style={{ flex: 1, height: 30 }}
              />
              설명
              <input
                value={tip.description ?? ''}
                onChange={(e) => handleChangeTip(e, index, 'description')}
                style={{ flex: 1, height: 30 }}
              />
              이미지
              {tip.imageUrl}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleChangeTip(e, index, 'imageUrl')}
              />
              <SkeletonImage
                src={tip.imageUrl || '/Diamond2.png'}
                alt="image"
                width={144}
                height={120}
              />
              <Button
                variant="filled"
                hierarchy="primary"
                style={{ width: 500 }}
                onClick={() => handleClickModifyTip(tip.id)}
              >
                수정하기
              </Button>
            </Flex>
          ))}
        </Flex>
        <Text variant="h5" style={{ marginTop: 32 }}>
          정보:
        </Text>
        <Flex flexDirection="column" gap={12}>
          <Flex flexDirection="column" gap={4}>
            설명
            <input
              value={currentResult.info.description ?? ''}
              onChange={(e) => handleChangeInfo(e, 'description')}
              style={{ flex: 1, height: 30 }}
            />
            캐릭터 이름
            <input
              value={currentResult.info.characterName ?? ''}
              onChange={(e) => handleChangeInfo(e, 'characterName')}
              style={{ flex: 1, height: 30 }}
            />
            해시태그
            <input
              value={currentResult.info?.hashTags ?? ''}
              onChange={(e) => handleChangeInfo(e, 'hashTags')}
              style={{ flex: 1, height: 30 }}
            />
          </Flex>
        </Flex>

        <Button
          variant="filled"
          hierarchy="primary"
          style={{ width: 500 }}
          onClick={handleClickModifyInfo}
        >
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
    const data = await BaumannService.getAllResult();

    return {
      props: {
        results: data,
      },
    };
  } catch (error) {
    return {
      props: {
        results: [],
      },
    };
  }
};

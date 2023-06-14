import { SkinTypeInfo } from '@/api/service/SkinTypeService';
import type { BaumannAnswer, BaumannQuestion, SkinType, Tip } from '../baumann';

export interface BaumannResultResponse {
  type: SkinType;
  percents: {
    D: number;
    O: number;
    S: number;
    R: number;
    N: number;
    P: number;
    W: number;
    T: number;
  };
  tips: Tip[];
  info: SkinTypeInfo;
}

type BaumannQuestionImageResponse = {
  type: 'question';
  data: BaumannQuestion;
};

type BaumannAnswerImageResponse = {
  type: 'answer';
  data: BaumannAnswer;
};

export type BaumannImageResponse = BaumannQuestionImageResponse | BaumannAnswerImageResponse;

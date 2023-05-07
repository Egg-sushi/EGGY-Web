import type { BaumannAnswer, BaumannQuestion } from '../baumann';

export interface BaumannResultResponse {
  type: string;
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

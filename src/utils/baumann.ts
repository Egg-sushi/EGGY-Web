import { safeSessionStorage } from './storage';

import type { UserAnswer } from '@/types/baumann';

const EGGY_BAUMANN_ANSWER_STORAGE_KEY = 'EGGY_BAUMANN_ANSWER_STORAGE_KEY';
type BaumannAnswerStorageData = Record<number, number>;

export const getAnswers: () => BaumannAnswerStorageData = () => {
  const items = safeSessionStorage.get(EGGY_BAUMANN_ANSWER_STORAGE_KEY);
  return items === null ? {} : JSON.parse(items);
};

export const saveAnswer = (userAnswer: UserAnswer) => {
  const items = safeSessionStorage.get(EGGY_BAUMANN_ANSWER_STORAGE_KEY);
  const nextAnswers: BaumannAnswerStorageData = items === null ? {} : JSON.parse(items);
  nextAnswers[userAnswer.questionId] = userAnswer.answerId;

  safeSessionStorage.set(EGGY_BAUMANN_ANSWER_STORAGE_KEY, JSON.stringify(nextAnswers));
};

export const resetAnswers = () => {
  safeSessionStorage.remove(EGGY_BAUMANN_ANSWER_STORAGE_KEY);
};

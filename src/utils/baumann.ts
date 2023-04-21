import { UserAnswer } from '../../@types/baumann';
import { safeSessionStorage } from './storage';

const EGGY_BAUMANN_ANSWER_STORAGE_KEY = 'EGGY_BAUMANN_ANSWER_STORAGE_KEY';

export const getAnswers = () => {
  return safeSessionStorage.get(EGGY_BAUMANN_ANSWER_STORAGE_KEY);
};

export const pushAnswer = (userAnswer: UserAnswer) => {
  const prevAnswersItem = safeSessionStorage.get(EGGY_BAUMANN_ANSWER_STORAGE_KEY);

  if (prevAnswersItem === null) {
    safeSessionStorage.set(EGGY_BAUMANN_ANSWER_STORAGE_KEY, JSON.stringify([userAnswer]));
  } else {
    const prevAnswers: UserAnswer[] = JSON.parse(prevAnswersItem);
    safeSessionStorage.set(
      EGGY_BAUMANN_ANSWER_STORAGE_KEY,
      JSON.stringify([...prevAnswers, userAnswer]),
    );
  }
};

export const resetAnswer = () => {
  safeSessionStorage.remove(EGGY_BAUMANN_ANSWER_STORAGE_KEY);
};

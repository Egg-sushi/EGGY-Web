import { useGetBaumannQuestions, useGetBaumannTest } from '@/api/query';
import { BaumannAType, BaumannBType } from '@/components';
import { DUMMY_BAUMANN_A, DUMMY_BAUMANN_B } from '@/dummy/baumann';

const QNAComponentsByType = {
  A: BaumannAType,
  B: BaumannBType,
} as const;

export default function useBaumann(currentQnaIndex: number) {
  const { data, isLoading, isError } = useGetBaumannQuestions();
  const dummy = [DUMMY_BAUMANN_A, DUMMY_BAUMANN_B];
  const BaumannQNAList = !isLoading && !isError ? data ?? dummy : dummy;

  let tmp = 0;
  const subSteps = BaumannQNAList.reduce((pre, cur, idx) => {
    const next = { ...pre };
    if (!next[cur.type]) {
      next[cur.type] = { id: tmp, num: 0, start: idx };
      tmp++;
    }
    next[cur.type].num += 1;
    return next;
  }, {} as any);

  const currentQna = BaumannQNAList[currentQnaIndex];
  const prevQna = BaumannQNAList[currentQnaIndex - 1];
  const nextQna = BaumannQNAList[currentQnaIndex + 1];

  const qnaType = currentQna?.questionType ?? 'A';
  const qnaSize = BaumannQNAList.length;
  const BaumannQNAComponent = QNAComponentsByType[qnaType];

  const currentSubStepIndex = currentQnaIndex - subSteps[currentQna.type].start + 1;
  const totalSubStepNum = subSteps[currentQna.type].num;
  const currentStepIndex = subSteps[currentQna.type].id;

  return {
    prevQna,
    nextQna,
    currentQna,
    currentSubStepIndex,
    currentStepIndex,
    totalSubStepNum,
    qnaType,
    qnaSize,
    BaumannQNAComponent,
  };
}

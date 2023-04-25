import { useGetBaumannQuestions, useGetBaumannTest } from '@/api/query';
import { BaumannAType, BaumannBType } from '@/components';
import { DUMMY_BAUMANN_A, DUMMY_BAUMANN_B } from '@/dummy/baumann';
import { BaumannQuestion } from '@/types/baumann';

const QNAComponentsByType = {
  A: BaumannAType,
  B: BaumannBType,
} as const;

type BaumannQNASubSteps = Record<
  BaumannQuestion['type'],
  { id: number; num: number; startIdx: number }
>;

export default function useBaumann(currentQnaIndex: number) {
  const { data, isLoading, isError } = useGetBaumannQuestions();
  const dummy = [DUMMY_BAUMANN_A, DUMMY_BAUMANN_B];
  const baumannQNAList = !isLoading && !isError ? data ?? dummy : dummy;

  let tmp = 0;
  const subSteps = baumannQNAList.reduce((pre, cur, idx) => {
    const next = { ...pre };
    if (!next[cur.type]) {
      next[cur.type] = { id: tmp, num: 0, startIdx: idx };
      tmp++;
    }
    next[cur.type].num += 1;
    return next;
  }, {} as BaumannQNASubSteps);

  const qnaSize = baumannQNAList.length;

  const currentQna = baumannQNAList[currentQnaIndex];
  const qnaType = currentQna?.questionType ?? 'A';

  return {
    qnaType,
    currentQna,
    prevQna: baumannQNAList[Math.max(currentQnaIndex - 1, 0)],
    nextQna: baumannQNAList[Math.min(currentQnaIndex + 1, qnaSize - 1)],
    isLastQna: currentQnaIndex === qnaSize - 1,
    currentSubStepIndex: currentQnaIndex - subSteps[currentQna.type].startIdx + 1,
    currentStepIndex: subSteps[currentQna.type].id,
    totalSubStepNum: subSteps[currentQna.type].num,
    BaumannQNAComponent: QNAComponentsByType[qnaType],
  };
}

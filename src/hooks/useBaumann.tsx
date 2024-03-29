import { useGetBaumannQuestions } from '@/api/query';
import type { BaumannQuestion } from '@/types/baumann';
import { BaumannGRIDPICTUREType, BaumannLONGSTRINGType, BaumannPLAINType } from '@/components';
import { DUMMY_BAUMANN_LONG_STRING, DUMMY_BAUMANN_PLAIN } from '@/dummy/baumann';

const QNAComponentsByType = {
  LONG_STRING: BaumannLONGSTRINGType,
  PLAIN: BaumannPLAINType,
  GRID_PICTURE: BaumannGRIDPICTUREType,
} as const;

type BaumannQNASubSteps = Record<
  BaumannQuestion['type'],
  { id: number; num: number; startIdx: number }
>;

export default function useBaumann(currentQnaIndex: number) {
  const { data, isLoading, isError } = useGetBaumannQuestions();
  const dummy = [DUMMY_BAUMANN_LONG_STRING, DUMMY_BAUMANN_PLAIN];
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
  const qnaType = currentQna?.questionType;

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

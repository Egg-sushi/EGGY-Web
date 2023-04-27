import { useMutation, useQuery } from 'react-query';
import { BaumannService } from '../service';
import { minute } from '@/utils/time';
import { UserAnswer } from '@/types/baumann';

const BAUMANN_KEY = 'baumann';

export const useGetBaumannTest = () => useQuery([BAUMANN_KEY], () => BaumannService.test());
export const useGetBaumannQuestions = () =>
  useQuery([BAUMANN_KEY, 'question'], () => BaumannService.questions(), { staleTime: minute(5) });

export const useCalculateSkinTypes = (data: UserAnswer[]) =>
  useQuery([BAUMANN_KEY, 'calculate-skin'], () => BaumannService.calculateTypes(data));

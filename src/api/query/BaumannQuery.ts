import { useQuery } from 'react-query';
import { BaumannService } from '../service';
import { minute } from '@/utils/time';

const BAUMANN_KEY = 'baumann';

export const useGetBaumannTest = () => useQuery([BAUMANN_KEY], () => BaumannService.test());
export const useGetBaumannQuestions = () =>
  useQuery([BAUMANN_KEY], () => BaumannService.questions(), { staleTime: minute(5) });

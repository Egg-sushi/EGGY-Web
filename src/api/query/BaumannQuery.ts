import { useQuery } from 'react-query';
import { BaumannService } from '../service';

const BAUMANN_KEY = 'baumann';

export const useGetBaumannTest = () =>
  useQuery([BAUMANN_KEY], () => BaumannService.test(), {
    suspense: true
  });

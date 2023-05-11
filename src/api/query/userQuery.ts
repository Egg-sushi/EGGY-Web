import { useMutation } from 'react-query';
import { UserService } from '../service';
import { useLink } from '@/hooks';

const USER_KEY = 'user';

export const useSignUp = (name: string, gender: string, birthday: string, countryId: number) => {
  const link = useLink();
  return useMutation([USER_KEY], () => UserService.signUp({ name, gender, birthday, countryId }), {
    onSuccess: () => {
      alert('Success');
      link.to('home');
    },
    onError: () => {
      alert('Already exits');
      link.to('home');
    },
  });
};

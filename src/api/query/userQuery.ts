import { useMutation } from 'react-query';
import { UserService } from '../service';

const USER_KEY = 'user';

export const useSignUp = (name: string, gender: string, birthday: string, countryId: number) => {
  return useMutation([USER_KEY], () => UserService.signUp({ name, gender, birthday, countryId }), {
    onSuccess: () => {},
  });
};

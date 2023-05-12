import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserService } from '../service';
import { useLink } from '@/hooks';
import { SkinType } from '@/types/baumann';

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

export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation([USER_KEY], () => UserService.logOut(), {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_KEY]);
      alert('Success');
    },
    onError: () => {
      alert('Error');
    },
  });
};

export const useIsLogin = () => {
  return useQuery([USER_KEY], () => UserService.isLogin());
};

export const useUserSkinType = () => {
  const { data } = useIsLogin();

  return useQuery([USER_KEY, 'skinType'], () => UserService.getUserSkinType(), {
    enabled: data?.isLogin,
  });
};

export const useSaveUserSkinType = (skinType: SkinType) => {
  const queryClient = useQueryClient();
  return useMutation([USER_KEY, 'skinType', 'save'], () => UserService.saveUserSkinType(skinType), {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_KEY, 'skinType']);
    },
  });
};

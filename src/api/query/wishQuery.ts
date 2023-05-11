import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WishService } from '../service';
import type { ProductId } from '@/types/api';
import { useIsLogin } from './userQuery';

const WISH_KEY = 'wish';

export const useIsUserLikeProduct = (ids: ProductId) => {
  const isLogin = useIsLogin();

  return useQuery([WISH_KEY, ids.productId], () => WishService.isUserLikeProduct(ids), {
    enabled: isLogin.data?.isLogin && !!ids.productId,
  });
};

export const useToggleUserLike = (ids: ProductId) => {
  const queryClient = useQueryClient();

  return useMutation([WISH_KEY, ids.productId], () => WishService.toggleUserLike(ids), {
    onSuccess: () => {
      queryClient.invalidateQueries([WISH_KEY, ids.productId]);
    },
    onError: () => {
      alert('You have to log in to add the product to the wishlist.');
    },
  });
};

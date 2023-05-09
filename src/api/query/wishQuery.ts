import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WishService } from '../service';
import type { UserProductId } from '@/types/api';

const WISH_KEY = 'wish';

export const useIsUserLikeProduct = (ids: UserProductId) =>
  useQuery([WISH_KEY, ids.userId, ids.productId], () => WishService.isUserLikeProduct(ids), {
    enabled: !!ids.userId && !!ids.productId,
  });

export const useToggleUserLike = (ids: UserProductId) => {
  const queryClient = useQueryClient();

  return useMutation([WISH_KEY, ids.userId, ids.productId], () => WishService.toggleUserLike(ids), {
    onSuccess: () => {
      queryClient.invalidateQueries([WISH_KEY, ids.userId, ids.productId]);
    },
  });
};

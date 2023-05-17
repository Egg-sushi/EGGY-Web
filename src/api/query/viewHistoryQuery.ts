import { useMutation } from 'react-query';
import { ViewHistoryService } from '../service';

const VIEW_HISTORY_KEY = 'view-history';

export const useViewProduct = (productId: number) => {
  return useMutation([VIEW_HISTORY_KEY, productId], () =>
    ViewHistoryService.viewProduct(productId),
  );
};

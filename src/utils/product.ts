import { Tag } from '@/components';
import { Product } from '@/types/product';

export const ProductPriceHierarchy: Record<
  Product['priceRangeName'],
  Parameters<typeof Tag>[0]['hierarchy']
> = {
  LOW: 'gray',
  MIDDLE: 'secondary',
  HIGH: 'primary',
};

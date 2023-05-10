import { SearchBar, Tag } from '@/components';
import type { Product } from '@/types/product';

export const ProductPriceHierarchy: Record<
  Product['priceRangeName'],
  Parameters<typeof Tag>[0]['hierarchy']
> = {
  LOW: 'gray',
  MIDDLE: 'secondary',
  HIGH: 'primary',
};

export const FilterHierarchy: Record<
  keyof Parameters<typeof SearchBar>[0]['filters'],
  Parameters<typeof Tag>[0]['hierarchy']
> = {
  categories: 'skyblue',
  skinTypes: 'secondary',
  priceRanges: 'beige300',
};

import { useInfiniteQuery } from 'react-query';

import { ProductService } from '../service';
import type { ProductFilter } from '@/types/product';

const PRODUCT_KEY = 'product';

export const useInfiniteProductScroll = (filter: ProductFilter) =>
  useInfiniteQuery(
    [
      PRODUCT_KEY,
      JSON.stringify(filter.categories),
      JSON.stringify(filter.priceRanges),
      JSON.stringify(filter.skinTypes),
      filter.search,
      filter.size,
    ],
    ({ pageParam = 1 }) => ProductService.getFilterProducts({ filter, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const cursor = lastPage?.data?.[lastPage.data.length - 1]?.id + 1;
        const currentPage = allPages.length;
        const totalPage = Math.ceil(lastPage.totalCount / filter.size);
        return { cursor, hasNextPage: currentPage < totalPage - 1 };
      },
    },
  );

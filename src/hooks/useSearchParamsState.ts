import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import useLink from './useLink';
import { NavigationKey } from '@/constants';

interface Props {
  type: NavigationKey;
}

export default function useSearchParamsState({ type }: Props): {
  searchParams: ReadonlyURLSearchParams;
  setSearchParams: (params: Object) => void;
} {
  const link = useLink();
  const searchParams = useSearchParams();

  const urlSearchParams = React.useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  const setSearchParams = React.useCallback(
    (params: Object) => {
      const prevQuery = link.query;
      Object.entries({ ...prevQuery, ...params }).forEach(([key, value]) => {
        if (String(value) !== '') {
          urlSearchParams.set(key, String(value));
        } else {
          urlSearchParams.delete(key);
        }
      });
      link.setQuery(type, urlSearchParams.toString());
    },
    [link, type, urlSearchParams],
  );

  return { searchParams, setSearchParams };
}

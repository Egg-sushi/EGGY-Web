import React from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION, NavigationKey } from '@/constants';

function generateNavigationHref(key: NavigationKey, id?: string): string {
  const href = NAVIGATION[key].href;
  if (typeof href === 'function') {
    if (typeof id === 'undefined') {
      throw new Error('INVALID NAVIGATION TYPE');
    }
    return href(id);
  }
  return href;
}

export default function useLink() {
  const router = useRouter();

  return React.useMemo(() => {
    return {
      ...router,
      back: () => {
        router.back();
      },
      to: (path: NavigationKey, id?: string) => {
        const href = generateNavigationHref(path, id);
        router.push(href);
      },
      replace: (path: NavigationKey, id?: string) => {
        const href = generateNavigationHref(path, id);
        router.replace(href);
      },
      setQuery: (path: NavigationKey, query: string) => {
        const queryString = query !== '' ? `?${query}` : '';
        router.push(path + queryString);
      },
    };
  }, [router]);
}

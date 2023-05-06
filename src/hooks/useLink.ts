import React from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION, NavigationKey } from '@/constants';

function generateNavigationHref(key: NavigationKey, id?: number): string {
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
      back: () => {
        router.back();
      },
      to: (path: NavigationKey, id?: number) => {
        const href = generateNavigationHref(path, id);
        router.push(href);
      },
      replace: (path: NavigationKey, id?: number) => {
        const href = generateNavigationHref(path, id);
        router.replace(href);
      },
    };
  }, [router]);
}

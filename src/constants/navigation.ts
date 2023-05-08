export type NavigationKey =
  | 'home'
  | 'ocr'
  | 'skinTypeTest'
  | 'skinTypeTestIntro'
  | 'skinTypeTestResult'
  | 'products'
  | 'productItem'
  | 'login';

export type DynamicNavigationKey = Extract<NavigationKey, 'productItem'>;
type NavigationHref<Key extends NavigationKey> = Key extends DynamicNavigationKey
  ? (id: string) => string
  : string;

type NavigationEntries = {
  [K in NavigationKey]: {
    title: string;
    href: NavigationHref<K>;
    header: boolean;
  };
};

export const NAVIGATION: NavigationEntries = {
  home: {
    title: 'HOME',
    href: '/',
    header: true,
  },
  ocr: {
    title: 'OCR',
    href: '/ocr',
    header: true,
  },
  skinTypeTestIntro: {
    title: 'SkinType Test',
    href: '/skintype',
    header: true,
  },
  skinTypeTest: {
    title: 'SkinType Question',
    href: '/skintype/question',
    header: false,
  },
  skinTypeTestResult: {
    title: 'SkinType Result',
    href: '/skintype/result',
    header: false,
  },
  products: {
    title: 'Cosmetics',
    href: '/products',
    header: true,
  },
  productItem: {
    title: 'Cosmetic',
    href: (id: string) => `/products/${id}`,
    header: false,
  },
  login: {
    title: 'LOGIN',
    href: '/login',
    header: false,
  },
} as const;

export const STATIC_NAVIGATION = Object.entries(NAVIGATION)
  .map((navigation) => ({
    ...navigation[1],
    key: navigation[0] as NavigationKey,
  }))
  .filter((navigation) => navigation.header);

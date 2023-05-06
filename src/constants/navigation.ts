export type NavigationKey =
  | 'home'
  | 'ocr'
  | 'skinTypeTest'
  | 'skinTypeTestIntro'
  | 'skinTypeTestResult'
  | 'products'
  | 'productItem';

export type DynamicNavigationKey = Extract<NavigationKey, 'productItem'>;
type NavigationHref<Key extends NavigationKey> = Key extends DynamicNavigationKey
  ? (id: number) => string
  : string;

type NavigationEntries = {
  [K in NavigationKey]: {
    title: string;
    href: NavigationHref<K>;
  };
};

export const NAVIGATION: NavigationEntries = {
  home: {
    title: 'HOME',
    href: '/',
  },
  ocr: {
    title: 'OCR',
    href: '/ocr',
  },
  skinTypeTestIntro: {
    title: 'SkinType Test',
    href: '/skintype',
  },
  skinTypeTest: {
    title: 'SkinType Question',
    href: '/skintype/question',
  },
  skinTypeTestResult: {
    title: 'SkinType Result',
    href: '/skintype/result',
  },
  products: {
    title: 'Cosmetics',
    href: '/products',
  },
  productItem: {
    title: 'Cosmetic',
    href: (id: number) => `/products/${id}`,
  },
} as const;

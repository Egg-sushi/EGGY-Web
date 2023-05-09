import { SkinType } from './baumann';

export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface Brand {
  id: number;
  title: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  brand: Brand['title'];
  category: Category['title'];
  priceRangeName: 'LOW' | 'MIDDLE' | 'HIGH';
  goods: SkinType[];
  bads: SkinType[];
}

export interface ProductFilter {
  search: string;
  categories: string[];
  size: number;
  skinTypes: SkinType[];
  priceRanges: Product['priceRangeName'][];
}

export type ProductInList = Pick<Product, 'id' | 'title' | 'brand' | 'category' | 'imageUrl'>;
export type ResponseProductList = {
  totalCount: number;
  data: ProductInList[];
};

export type FilterList = {
  categories: Category['title'][];
  skinTypes: SkinType[];
  priceRanges: Product['priceRangeName'][];
};

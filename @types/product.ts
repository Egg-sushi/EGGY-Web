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
  categories: string[];
  search: string;
}

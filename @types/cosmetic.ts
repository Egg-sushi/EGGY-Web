export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface Brand {
  id: number;
  title: string;
}

export interface Cosmetic {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  Brand: Brand;
  category: Category;
}

export interface CosmeticFilter {
  categories: string[];
  search: string;
}

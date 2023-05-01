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
  price: number;
  Brand: Brand;
  category: Category;
}

export interface ProductFilter {
  categories: string[];
  search: string;
}

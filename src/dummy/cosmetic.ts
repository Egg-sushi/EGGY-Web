import { Product } from '@/types/product';

export const DUMMY_PRODUCT: Product = {
  id: 1,
  title: 'Saturn Sulfur',
  description: 'description',
  imageUrl: '/product.jpeg',
  price: 300,
  Brand: {
    id: 1,
    title: 'Sunday Riley',
  },
  category: {
    id: 1,
    title: 'SERUM',
    description: '',
  },
};

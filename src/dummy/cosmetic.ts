import { Cosmetic } from '@/types/cosmetic';

export const DUMMY_COSMETIC: Cosmetic = {
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

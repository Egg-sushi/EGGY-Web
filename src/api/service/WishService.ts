import HTTPInterface from './core';

import type { ProductId } from '@/types/api';
import type { Product } from '@/types/product';

class WishService extends HTTPInterface {
  public constructor() {
    super('wish');
  }

  public toggleUserLike(data: ProductId): Promise<{ message: string }[]> {
    return this.baseHTTP
      .post('toggle', data)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getUserWishList(): Promise<Product[]> {
    return this.baseHTTP
      .get(`list`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public isUserLikeProduct({ productId }: ProductId): Promise<boolean> {
    return this.baseHTTP
      .get(`check?&productId=${productId}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const wishService = new WishService();

export default wishService;

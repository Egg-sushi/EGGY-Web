import { UserProductId } from '@/types/api';
import HTTPInterface from './core';
import { Product } from '@/types/product';

class WishService extends HTTPInterface {
  public constructor() {
    super('wish');
  }

  public toggleUserLike(data: UserProductId): Promise<{ message: string }[]> {
    return this.baseHTTP
      .post('toggle', {
        ...data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getUserWishList(id: string): Promise<Product[]> {
    return this.baseHTTP
      .get(`list/${id}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public isUserLikeProduct({ userId, productId }: UserProductId): Promise<boolean> {
    return this.baseHTTP
      .get(`check?userId=${userId}&productId=${productId}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const wishService = new WishService();

export default wishService;

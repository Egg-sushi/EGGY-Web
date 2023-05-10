import { UserProductId } from '@/types/api';
import HTTPInterface from './core';
import { Product, RequestProduct } from '@/types/product';

class RequestProductService extends HTTPInterface {
  public constructor() {
    super('request');
  }

  public getRequestProducts(): Promise<{ id: number; userId: number; name: string }[]> {
    return this.baseHTTP
      .get('list')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public submitRequestProduct(
    data: Pick<RequestProduct, 'userId' | 'name'>,
  ): Promise<RequestProduct> {
    return this.baseHTTP
      .post(`submit`, data)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const requestProductService = new RequestProductService();

export default requestProductService;

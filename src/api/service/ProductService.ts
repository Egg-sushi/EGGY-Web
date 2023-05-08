import HTTPInterface from './core';
import { Product } from '@/types/product';

class ProductService extends HTTPInterface {
  public constructor() {
    super('product');
  }

  public getAllIds(): Promise<{ id: Product['id'] }[]> {
    return this.baseHTTP
      .get('ids')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getProduct(id: string): Promise<Product> {
    return this.baseHTTP
      .get(`?id=${id}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const productService = new ProductService();

export default productService;

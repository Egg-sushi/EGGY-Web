import HTTPInterface from './core';
import type { Product, ProductFilter, ResponseProductList, UserFilterList } from '@/types/product';

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

  /** currentPage는 기존에 받은 product의 마지막 id이다 */
  public getFilterProducts({
    filter,
    pageParam,
  }: {
    filter: ProductFilter;
    pageParam: any;
  }): Promise<ResponseProductList> {
    const { categories, search, size, skinTypes, priceRanges } = filter;
    const cursor = isNaN(pageParam.cursor) ? 0 : pageParam.cursor;

    return this.baseHTTP
      .get(
        `all?cursor=${cursor}&take=${size}&search=${search}&categories=${categories.join(
          ',',
        )}&skinTypes=${skinTypes.join(',')}&priceRanges=${priceRanges.join(',')}`,
      )
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getAllFilters(): Promise<UserFilterList> {
    return this.baseHTTP
      .get('filter')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const productService = new ProductService();

export default productService;

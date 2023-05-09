import { SkinType } from '@/types/baumann';
import HTTPInterface from './core';
import type {
  Category,
  FilterList,
  Product,
  ProductFilter,
  ProductInList,
  ResponseProductList,
} from '@/types/product';

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

    return this.baseHTTP
      .get(
        `all?cursor=${
          pageParam.cursor ?? 0
        }&take=${size}&search=${search}&categories=${categories.join(
          ',',
        )}&skinTypes=${skinTypes.join(',')}&priceRanges=${priceRanges.join(',')}`,
      )
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getAllFilters(): Promise<FilterList> {
    return this.baseHTTP
      .get('filter')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const productService = new ProductService();

export default productService;

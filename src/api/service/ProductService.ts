import { SkinType } from '@/types/baumann';
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

  public getSearchProductByTitle(search: string): Promise<ResponseProductList> {
    return this.baseHTTP
      .get(`all?cursor=${0}&take=${10}&search=${search}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getAllFilters(): Promise<UserFilterList> {
    return this.baseHTTP
      .get('filter')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public getRecommendCosmeticBySkinType(skinType: SkinType): Promise<Pick<Product, 'id'>> {
    return this.baseHTTP
      .get(`recommend?skinType=${skinType}`)
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const productService = new ProductService();

export default productService;

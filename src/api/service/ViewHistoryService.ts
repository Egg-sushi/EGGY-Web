import HTTPInterface from './core';

class ViewHistoryService extends HTTPInterface {
  public constructor() {
    super('view-history');
  }

  public viewProduct(productId: number) {
    return this.baseHTTP
      .post('view', {
        productId,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const viewHistoryService = new ViewHistoryService();

export default viewHistoryService;

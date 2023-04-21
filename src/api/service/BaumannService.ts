import HTTPInterface from './core';

class BaumannService extends HTTPInterface {
  public constructor() {
    super('baumann');
  }

  public test(): Promise<{ data: string }> {
    return this.baseHTTP
      .get('test')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const baumannService = new BaumannService();

export default baumannService;

import { BaumannQNA } from '@/types/baumann';
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

  public questions(): Promise<BaumannQNA[]> {
    return this.baseHTTP
      .get('questions')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const baumannService = new BaumannService();

export default baumannService;

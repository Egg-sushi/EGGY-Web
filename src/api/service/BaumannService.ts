import { BaumannImage, BaumannQNA, UserAnswer } from '@/types/baumann';
import HTTPInterface from './core';
import { BaumannImageResponse, BaumannResultResponse } from '@/types/api';

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

  public calculateTypes(data: UserAnswer[]): Promise<BaumannResultResponse> {
    return this.baseHTTP
      .post('calculate-types', {
        list: data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public modifyBaumannQNA(data: BaumannQNA): Promise<BaumannQNA> {
    return this.baseHTTP
      .put('modify', {
        baumann: data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }

  public modifyBaumannQNAImage(data: BaumannImage): Promise<BaumannImageResponse> {
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('type', data.type);
    formData.append('id', `${data.id}`);
    return this.baseHTTP
      .post('modify-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const baumannService = new BaumannService();

export default baumannService;

import HTTPInterface from './core';
import { Tip } from '@/types/baumann';

class TipService extends HTTPInterface {
  public constructor() {
    super('tip');
  }

  public modifyTipImage(data: { id: number; image: File }): Promise<Tip> {
    const formData = new FormData();
    formData.append('image', data.image);
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

  public modifyTip(data: Tip): Promise<Tip> {
    return this.baseHTTP
      .patch('modify', {
        tip: data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const tipService = new TipService();

export default tipService;

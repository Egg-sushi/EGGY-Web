import { SkinType } from '@/types/baumann';
import HTTPInterface from './core';

export interface SkinTypeInfo {
  id: number;
  title: SkinType;
  description: string;
  characterName: string;
  hashTags: string;
}

class SkinTypeService extends HTTPInterface {
  public constructor() {
    super('skintype');
  }

  public modifySkinType(data: SkinTypeInfo): Promise<SkinTypeInfo> {
    return this.baseHTTP
      .patch('modify', {
        skinType: data,
      })
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const skinTypeService = new SkinTypeService();

export default skinTypeService;

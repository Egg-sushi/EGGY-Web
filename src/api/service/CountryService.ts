import { Country } from '@/types/country';
import HTTPInterface from './core';

class CountryService extends HTTPInterface {
  public constructor() {
    super('country');
  }

  public getAllCountries(): Promise<Country[]> {
    return this.baseHTTP
      .get('all')
      .then(HTTPInterface._handleResponse)
      .catch(HTTPInterface._handleError);
  }
}

const countryService = new CountryService();

export default countryService;

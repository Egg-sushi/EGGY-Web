import { useQuery } from 'react-query';
import { CountryService } from '../service';

const COUNTRY_KEY = 'country';

export const useGetAllCountries = () =>
  useQuery([COUNTRY_KEY], () => CountryService.getAllCountries());

import { ICountry } from '../models/country.model';

export interface IAppState {
  regions: Array<string>;
  countriesByRegion: { [key: string]: Array<ICountry> };

  selectedRegion: string;
  selectedCountry: string;

  loading: boolean;
  error: any;
}

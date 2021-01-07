import { reducer, initialState } from './app.reducer';
import * as AppActions from './app.actions';
import { IAppState } from './app-state.model';
import { ICountry } from '../models/country.model';

describe('app.reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('selectRegion', () => {
    it('should set given region as selected', () => {
      const currentState: IAppState = {
        ...initialState,
        selectedRegion: 'Asia',
        selectedCountry: 'Turkey',
      };
      const newState: IAppState = {
        ...initialState,
        selectedRegion: 'Europe',
        selectedCountry: null,
      };

      const action = AppActions.selectRegion({ region: 'Europe' });
      const state = reducer(currentState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('selectCountry', () => {
    it('should set given country as selected', () => {
      const currentState: IAppState = {
        ...initialState,
        selectedRegion: 'Asia',
      };
      const newState: IAppState = {
        ...initialState,
        selectedRegion: 'Asia',
        selectedCountry: 'China',
      };

      const action = AppActions.selectCountry({ country: 'China' });
      const state = reducer(currentState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadCountries', () => {
    it('should set loading to true', () => {
      const currentState: IAppState = { ...initialState };
      const newState: IAppState = {
        ...initialState,
        loading: true,
      };

      const action = AppActions.loadCountries({ region: 'Asia' });
      const state = reducer(currentState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('countriesLoaded', () => {
    it('should set list of countries for selected region', () => {
      const mockCountries: Array<ICountry> = [
        {
          name: 'France',
          capital: 'Paris',
          population: 56123453,
          currencies: [{ code: 'EUR' }],
          flag: 'http://example.com/flag/fr.svg',
        },
      ];
      const currentState: IAppState = {
        ...initialState,
        loading: true,
        selectedRegion: 'Europe',
      };
      const newState: IAppState = {
        ...initialState,
        loading: false,
        selectedRegion: 'Europe',
        countriesByRegion: {
          Europe: [...mockCountries],
        },
      };

      const action = AppActions.countriesLoaded({ countries: mockCountries });
      const state = reducer(currentState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadCountriesFailed', () => {
    it('should set loading back to false and populate error', () => {
      const mockError = { message: 'mock error' };
      const currentState: IAppState = { ...initialState, loading: true };
      const newState: IAppState = {
        ...initialState,
        loading: false,
        error: mockError,
      };

      const action = AppActions.loadCountriesFailed({ error: mockError });
      const state = reducer(currentState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});

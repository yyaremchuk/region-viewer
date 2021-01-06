import { Action, createReducer, on } from '@ngrx/store';

import * as AppActions from './app.actions';
import { IAppState } from './app-state.model';

const initialState: IAppState = {
  regions: ['Europe', 'Asia'],
  countriesByRegion: {},
  selectedRegion: null,
  selectedCountry: null,
  loading: false,
};

export const reducer = createReducer<IAppState, Action>(
  initialState,
  on(AppActions.selectRegion, (state, { region }) => ({
    ...state,
    selectedRegion: region,
    selectedCountry: null,
  })),
  on(AppActions.selectCountry, (state, { country }) => ({
    ...state,
    selectedCountry: country,
  })),
  on(AppActions.loadCountries, (state) => ({
    ...state,
    loading: true,
  })),
  on(AppActions.countriesLoaded, (state, { countries }) => {
    const regionMap = { ...state.countriesByRegion };
    regionMap[state.selectedRegion] = countries;
    return { ...state, countriesByRegion: regionMap, loading: false };
  }),
  on(AppActions.loadMoviesFailed, (state, { error }) => ({
    ...state,
    loading: false,
  }))
);

import { createSelector } from '@ngrx/store';
import { IAppState } from './app-state.model';
import { ICountry } from '../models/country.model';

export const selectFeature = (state: { app: IAppState }) => state.app;

export const selectRegions = createSelector(
  selectFeature,
  (state: IAppState) => state.regions
);

export const selectLoading = createSelector(
  selectFeature,
  (state: IAppState) => state.loading
);

export const selectRegionName = createSelector(
  selectFeature,
  (state: IAppState) => state.selectedRegion
);

export const selectCountryName = createSelector(
  selectFeature,
  (state: IAppState) => state.selectedCountry
);

export const selectCountry = createSelector(
  selectFeature,
  (state: IAppState) => {
    if (
      !state.selectedRegion ||
      !state.countriesByRegion[state.selectedRegion]
    ) {
      return null;
    }

    return state.countriesByRegion[state.selectedRegion].find(
      (country) => country.name === state.selectedCountry
    );
  }
);

export const selectCountries = createSelector(
  selectFeature,
  (state: IAppState) => {
    if (!state.countriesByRegion[state.selectedRegion]) {
      return [];
    }

    return state.countriesByRegion[state.selectedRegion].map(
      (country: ICountry) => country.name
    );
  }
);

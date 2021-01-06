import { createAction, props } from '@ngrx/store';
import { ICountry } from '../models/country.model';
import * as AppActionTypes from './app-action.types';

export const loadCountries = createAction(
  AppActionTypes.LOAD_COUNTRIES,
  props<{ region: string }>()
);

export const countriesLoaded = createAction(
  AppActionTypes.COUNTRIES_LOADED,
  props<{ countries: Array<ICountry> }>()
);

export const loadMoviesFailed = createAction(
  AppActionTypes.LOAD_COUNTRIES_FAILED,
  props<{ error: any }>()
);

export const selectRegion = createAction(
  AppActionTypes.SELECT_REGION,
  props<{ region: string }>()
);

export const selectCountry = createAction(
  AppActionTypes.SELECT_COUNTRY,
  props<{ country: string }>()
);

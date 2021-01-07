import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { CountriesService } from '../services/countries.service';
import * as AppActions from './app.actions';
import { selectCountriesByRegion } from './app.selectors';

@Injectable()
export class AppEffects {
  selectRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.selectRegion),
      withLatestFrom(this.store.select(selectCountriesByRegion)),
      mergeMap(([action, countriesByRegion]) => {
        console.log('aaa', countriesByRegion);

        // if countries for selected region have been loaded before
        if (countriesByRegion[action.region]) {
          return EMPTY;
        }

        return of(AppActions.loadCountries({ region: action.region }));
      })
    )
  );

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadCountries),
      mergeMap((action) =>
        this.countryService.getCountries(action.region).pipe(
          map((countries) => AppActions.countriesLoaded({ countries })),
          catchError((error) => of(AppActions.loadCountriesFailed({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly countryService: CountriesService,
    private readonly store: Store<{}>
  ) {}
}

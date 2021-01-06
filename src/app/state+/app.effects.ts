import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CountriesService } from '../services/countries.service';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  selectRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.selectRegion),
      mergeMap((action) =>
        of(AppActions.loadCountries({ region: action.region }))
      )
    )
  );

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadCountries),
      mergeMap((action) =>
        this.countryService.getCountries(action.region).pipe(
          map((countries) => AppActions.countriesLoaded({ countries })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly countryService: CountriesService
  ) {}
}

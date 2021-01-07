import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, EMPTY } from 'rxjs';
import { hot } from 'jasmine-marbles';

import * as AppActions from './app.actions';
import { CountriesService } from '../services/countries.service';
import { AppEffects } from './app.effects';
import { selectCountriesByRegion } from './app.selectors';
import { ICountry } from '../models/country.model';

const mockCountries: Array<ICountry> = [
  {
    name: 'France',
    capital: 'Paris',
    population: 56123453,
    currencies: [{ code: 'EUR' }],
    flag: 'http://example.com/flag/fr.svg',
  },
];

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppEffects,
        provideMockStore({
          selectors: [
            {
              selector: selectCountriesByRegion,
              value: {},
            },
          ],
        }),
        provideMockActions(() => actions$),
        {
          provide: CountriesService,
          useValue: {
            getCountries: () => of(mockCountries),
          },
        },
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  describe('selectRegion$', () => {
    it('should return loadCountries action', () => {
      const mockRegion = 'Europe';
      actions$ = hot('-a--', {
        a: AppActions.selectRegion({ region: mockRegion }),
      });

      const expected = hot('-b--', {
        b: AppActions.loadCountries({ region: mockRegion }),
      });

      expect(effects.selectRegion$).toBeObservable(expected);
    });

    // it('should return an empty action', () => {
    //   const mockRegion = 'Europe';
    //   actions$ = hot('-a--', {
    //     a: AppActions.selectRegion({ region: mockRegion }),
    //   });
    //
    //   const expected = hot('----');
    //
    //   expect(effects.selectRegion$).toBeObservable(expected);
    // });
  });

  describe('loadCountries$', () => {
    it('should call the service and return countriesLoaded action', () => {
      actions$ = hot('-a--', {
        a: AppActions.loadCountries({ region: 'Europe' }),
      });

      const expected = hot('-b--', {
        b: AppActions.countriesLoaded({ countries: mockCountries }),
      });

      expect(effects.loadCountries$).toBeObservable(expected);
    });
  });
});

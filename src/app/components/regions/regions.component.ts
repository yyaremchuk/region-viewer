import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import * as AppActions from '../../state+/app.actions';
import {
  selectRegions,
  selectCountries,
  selectLoading,
  selectCountryName,
  selectRegionName,
} from '../../state+/app.selectors';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  public regions$: Observable<Array<string>>;
  public countries$: Observable<Array<string>>;
  public countryDisabled$: Observable<boolean>;
  public selectedCountryName$: Observable<string>;
  public selectedRegionName$: Observable<string>;
  private loading$: Observable<boolean>;

  constructor(private readonly store: Store<{}>) {}

  public ngOnInit(): void {
    this.regions$ = this.store.select(selectRegions);
    this.countries$ = this.store.select(selectCountries);
    this.loading$ = this.store.select(selectLoading);
    this.selectedCountryName$ = this.store.select(selectCountryName);
    this.selectedRegionName$ = this.store.select(selectRegionName);

    this.countryDisabled$ = combineLatest([
      this.countries$,
      this.loading$,
    ]).pipe(
      map(([countries, loading]) => {
        return loading || countries.length === 0;
      })
    );
  }

  public onRegionChange(region: string): void {
    this.store.dispatch(AppActions.selectRegion({ region }));
  }

  public onCountryChange(country: string): void {
    this.store.dispatch(AppActions.selectCountry({ country }));
  }
}

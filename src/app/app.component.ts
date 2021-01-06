import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCountry } from './state+/app.selectors';
import { ICountry } from './models/country.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public country$: Observable<ICountry>;

  constructor(private readonly store: Store<{}>) {}

  public ngOnInit(): void {
    this.country$ = this.store.select(selectCountry);
  }
}

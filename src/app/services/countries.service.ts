import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ICountry } from '../models/country.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private readonly httpClient: HttpClient) {}

  public getCountries(region: string): Observable<Array<ICountry>> {
    return this.httpClient.get<Array<ICountry>>(
      `${this.getBaseApiUrl()}/${region}`
    );
  }

  public getBaseApiUrl(): string {
    return environment.baseApiUrl;
  }
}

import { Component, Input } from '@angular/core';
import { ICountry } from '../../models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  @Input()
  public country: ICountry;
}

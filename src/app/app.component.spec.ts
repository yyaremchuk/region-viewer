import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RegionsComponent } from './components/regions/regions.component';
import { CountryComponent } from './components/country/country.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent, RegionsComponent, CountryComponent],
      providers: [
        provideMockStore({
          initialState: {
            app: {
              regions: ['Europe', 'Asia'],
              countriesByRegion: {},
              selectedRegion: null,
              selectedCountry: null,
              loading: false,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

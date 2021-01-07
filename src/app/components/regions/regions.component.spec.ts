import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { RegionsComponent } from './regions.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

describe('RegionsComponent', () => {
  let component: RegionsComponent;
  let fixture: ComponentFixture<RegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionsComponent, DropdownComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});

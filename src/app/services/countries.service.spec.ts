import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CountriesService } from './countries.service';
import { ICountry } from '../models/country.model';

const mockApiUrl = 'https://example.com';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCountries', () => {
    it('should return list of countries for given region', () => {
      spyOn(service, 'getBaseApiUrl').and.returnValue(mockApiUrl);
      const mockRegion = 'Europe';
      const mockResponse: Array<ICountry> = [
        {
          name: 'Germany',
          capital: 'Berlin',
          population: 68234123,
          curruncies: [{ code: 'EUR' }],
          flag: 'https://example.com/flag/de.svg',
        },
      ];

      service
        .getCountries(mockRegion)
        .subscribe((data) => expect(data).toEqual(mockResponse));

      const req = httpMock.expectOne(`${mockApiUrl}/${mockRegion}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return list of countries for given region', () => {
      spyOn(service, 'getBaseApiUrl').and.returnValue(mockApiUrl);
      const mockRegion = 'Europe';
      const mockErrorMessage = 'test 404 error';

      service.getCountries(mockRegion).subscribe(
        () => fail('expected an error, not the data'),
        (error: HttpErrorResponse) =>
          expect(error.error).toEqual(mockErrorMessage)
      );

      const req = httpMock.expectOne(`${mockApiUrl}/${mockRegion}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockErrorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});

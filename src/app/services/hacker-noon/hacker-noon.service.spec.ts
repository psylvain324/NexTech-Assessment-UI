import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HackernoonService } from './hacker-noon.service';
import { HttpClient } from '@angular/common/http';

describe('HackernoonService', () => {
  let service: HackernoonService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(HackernoonService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', inject(
    [HttpTestingController, HackernoonService],
    (apiService: HackernoonService) => {
      expect(apiService).toBeTruthy();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });
});

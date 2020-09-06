import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryService } from './story.service';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryService);
  });

  service = TestBed.inject(StoryService);
  httpMock = TestBed.inject(HttpTestingController);

  it('should be created', inject(
    [HttpTestingController, StoryService],
    (apiService: StoryService) => {
      expect(apiService).toBeTruthy();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });
});

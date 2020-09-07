import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { MaterialModule } from '../../shared/material.module';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule]
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

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

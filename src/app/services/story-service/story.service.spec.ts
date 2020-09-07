import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { MaterialModule } from '../../shared/material.module';
import { Story } from 'src/app/interfaces/story.model';
import { FilterOptions } from 'src/app/interfaces/filter-option.model';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;
  const filterOptionsList: FilterOptions[] = [];

  const testData: Story[] = [
    {
      by: 'Phil',
      descendants: 1,
      kids: [123],
      score: 100,
      time: '0171990',
      title: 'Tech Assessment',
      type: 'Test',
      id: 123,
      url: 'www.test1.com',
    },
    {
      by: 'Phil',
      descendants: 1,
      kids: [123],
      score: 100,
      time: '0171990',
      title: 'NexTech Assessment',
      type: 'Test',
      id: 123,
      url: 'www.test1.com',
    },
    {
      by: 'Phil',
      descendants: 1,
      kids: [123],
      score: 100,
      time: '0171990',
      title: 'Tech Assessment',
      type: 'Test',
      id: 123,
      url: 'www.test1.com',
    },
  ];

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

  it('should filter by title', () => {
    filterOptionsList.push({
      searchText: 'NexTech',
      fieldName: 'title'
    });
    const result = service.transformMultipleFilters(testData, filterOptionsList);
    expect(result.length).toBe(1);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

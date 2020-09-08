import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Story } from '../../interfaces/story.model';
import { throwError, BehaviorSubject, Observable, of } from 'rxjs';
import { FilterOptions } from '../../interfaces/filter-option.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  readonly batchSize: number = 1;
  baseApi = environment.apiUrl;
  public storiesCache = new Map();
  public idsCache = new Map();
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  getStoryIds(): Observable<any[]> {
    const apiUrl = this.baseApi + 'StoryIds';
    const idsFromCache = this.idsCache.get(apiUrl);
    if (idsFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(idsFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: any[]) => {
        this.idsCache.set(apiUrl, data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStories(): Observable<any>  {
    const apiUrl = this.baseApi + 'NewStoriesByBatch';
    const storiesFromCache = this.storiesCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(storiesFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: Story[]) => {
        this.storiesCache.set(apiUrl, data);
        console.log('Data: ' + this.storiesCache);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryById(id: string): Observable<any>  {
    const apiUrl = this.baseApi + 'story/' + id;
    return this.http.get(apiUrl).pipe(
      map((data: Story) => {
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoriesPaginated(pageNumber: number, pageSize: number): Observable<any>  {
    const apiUrl = this.baseApi + pageNumber + '/' + pageSize;
    const storiesFromCache = this.storiesCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(storiesFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: string[]) => {
        this.storyIds.next(data);
        this.storiesCache.set(apiUrl, data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  transformMultipleFilters(items: any[], filterOptionList: FilterOptions[]): any[] {
    let filteredArray = items;
    if (!filteredArray) {
      return [];
    }
    for (const option of filterOptionList) {
      if (option.searchText != null && option.fieldName != null) {
        filteredArray = filteredArray.filter((item) => {
          if (item[option.fieldName] &&
            item[option.fieldName]
              .toLowerCase()
              .includes(option.searchText.toLowerCase())
          ) {
            return item;
          }
        });
      }
    }

    return filteredArray;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Story } from '../../interfaces/story.model';
import { throwError, BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackernoonService {
  apiUrl = environment.hackerNoonApi;
  testUrl = environment.testApiUrl;
  public storyIdCache  = new Map();
  public storiesCache = new Map();
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  get StoryIds(): Observable<string[]> {
    return this.storyIds.asObservable();
  }

  getTestStories(): Observable<any>  {
    const apiUrl = this.testUrl + 'stories';
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

  getNewestStoryIds(): Observable<any>  {
    const apiUrl = this.apiUrl + 'newstories.json?print=pretty';
    const idsFromCache = this.storyIdCache.get(apiUrl);
    if (idsFromCache) {
      console.log('Story IDs retrieved from Cache!');
      return of(idsFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: string[]) => {
        this.storyIds.next(data);
        this.storyIdCache.set(apiUrl, data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryById(id: string): Observable<any>  {
    const apiUrl = this.apiUrl + 'item/' + id + '.json?print=pretty';
    const storiesFromCache = this.storyIdCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(storiesFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: Story[]) => {
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

}

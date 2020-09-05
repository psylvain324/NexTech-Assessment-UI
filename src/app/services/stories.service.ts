import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Story } from '../interfaces/story.model';
import { throwError, BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  apiBaseUrl = environment.hackerNoonApi;
  public idCache = new Map();
  public storyCache  = new Map();
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  get StoryIds() {
    return this.storyIds.asObservable();
  }

  getNewestStoryIds(): Observable<any>  {
    const apiUrl = this.apiBaseUrl + 'newstories.json?print=pretty';
    const storiesFromCache = this.idCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retried from Cache!');
      return of(storiesFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: string[]) => {
        this.storyIds.next(data);
        this.idCache.set(apiUrl, data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryById(id: string): Observable<any>  {
    const apiUrl = this.apiBaseUrl + 'item/' + id + '.json?print=pretty';
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

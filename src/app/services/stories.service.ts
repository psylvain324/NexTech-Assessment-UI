import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Story } from '../interfaces/story.model';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  apiBaseUrl = environment.hackerNoonApi;
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  get StoryIds() {
    return this.storyIds.asObservable();
  }

  getNewestStoryIds() {
    const apiUrl = this.apiBaseUrl + 'newstories.json?print=pretty';
    return this.http.get(apiUrl).pipe(
      map((data: string[]) => {
        this.storyIds.next(data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryById(id: string) {
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

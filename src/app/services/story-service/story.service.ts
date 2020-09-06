import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Story } from '../../interfaces/story.model';
import { throwError, BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  baseApi = environment.apiUrl;
  public storiesCache = new Map();
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  async getStoriesAsync(): Promise<Story[]> {
    try {
      const response = await this.http
        .get(this.baseApi + 'StoryIds')
        .toPromise();
      return response as Story[];
    } catch (error) {
      await this.handleError(error);
    }
  }

  getStoriesPaginated(pageNumber: number, pageSize: number): Observable<any>  {
    const apiUrl = this.baseApi + pageNumber + '/' + pageSize;
    const storiesFromCache = this.storiesCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retried from Cache!');
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

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

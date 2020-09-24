import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Story } from '../../interfaces/story.model';
import { throwError, BehaviorSubject, Observable, of , forkJoin} from 'rxjs';
import { FilterOptions } from '../../interfaces/filter-option.model';
import { TreeNode } from 'primeng/api';
import { StoryViewModel } from 'src/app/interfaces/story-comments.model';
import { tap, concatMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StoryService {
  baseApi = environment.apiUrl;
  public storiesCache = new Map();
  public idsCache = new Map();
  private storyIds = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getStoryIds(): Observable<string[]> {
    const apiUrl = this.baseApi + 'NewStoryIds';
    const idsFromCache = this.idsCache.get(apiUrl);
    if (idsFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(idsFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: any[]) => {
        this.idsCache.set(apiUrl, data);
        this.storyIds.next(data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryIdValues(): Observable<string[]> {
    return this.storyIds.asObservable();
  }

  getStories(): Observable<Story[]> {
    const apiUrl = this.baseApi + 'NewStories';
    const storiesFromCache = this.storiesCache.get(apiUrl);
    if (storiesFromCache) {
      console.log('Stories retrieved from Cache!');
      return of(storiesFromCache);
    }
    return this.http.get(apiUrl).pipe(
      map((data: Story[]) => {
        this.storiesCache.set(apiUrl, data);
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getStoryById(id: string): Observable<Story> {
    const apiUrl = this.baseApi + 'Story/' + id;
    return this.http.get(apiUrl).pipe(
      map((data: Story) => {
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  getCommentsByStoryId(id: string): Observable<Comment> {
    const apiUrl = this.baseApi + 'CommentsById' + id;
    return this.http.get(apiUrl).pipe(
      map((data: Comment) => {
        return data;
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  // TODO - This needs work, haven't figured out yet.
  getStoryCommentViewModel(id: string): void {
    const apiUrl = this.baseApi + 'Story/' + id;
    this.http.get(apiUrl).pipe(
      map((data: Story) => {
        const kidsIds = of(data.kids);
        const getComments = (kidId: string) => of(this.baseApi + 'Comment/' + kidId);
        return kidsIds.pipe(
          tap((commentIds) => (commentIds = commentIds)),
          concatMap((commentIds) => {
            const apiRequest: Observable<string>[] = commentIds.map(commentId =>
              getComments(commentId));
            return forkJoin([...apiRequest]);
          })
        );
      }),
      catchError(() => {
        return throwError('There was a problem with the request');
      })
    );
  }

  async getNewStoriesTree(): Promise<TreeNode[]> {
    const apiUrl = this.baseApi + 'NewStories';
    const res = await this.http
      .get<any>(apiUrl)
      .toPromise();
    return res.data as TreeNode[];
  }

  async getCommentsByIdLazy(id: string): Promise<TreeNode[]> {
    const apiUrl = this.baseApi + 'StoryComments' + id;
    const res = await this.http
      .get<any>(apiUrl)
      .toPromise();
    return res.data as TreeNode[];
  }

  transformMultipleFilters(
    items: any[],
    filterOptionList: FilterOptions[]
  ): any[] {
    let filteredArray = items;
    if (!filteredArray) {
      return [];
    }
    for (const option of filterOptionList) {
      if (option.searchText != null && option.fieldName != null) {
        filteredArray = filteredArray.filter((item) => {
          if (
            item[option.fieldName] &&
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

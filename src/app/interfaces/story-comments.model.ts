import { MatTableDataSource } from '@angular/material/table';

export interface StoryViewModel {
  id: string;
  by: string;
  title: string;
  url: string;
  comments?: CommentViewModel[] | MatTableDataSource<CommentViewModel>;
}

export interface CommentViewModel {
  id: string;
  by: string;
  text: string;
}

export interface StoryDataSource {
  id: string;
  by: string;
  title: string;
  url: string;
  addresses?: MatTableDataSource<CommentViewModel>;
}

import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Story } from '../../interfaces/story.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { StoryService } from '../../services/story-service/story.service';
import {
  CommentViewModel,
  StoryViewModel,
  StoryDataSource,
} from '../../interfaces/story-comments.model';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CommentsComponent implements OnInit {
  title = 'Hacker Noon Story Comments Nested Table';
  storyIds: string[] = [];
  stories: Story[] = [];
  private subjectStoryList = new ReplaySubject<Story[]>();
  storyList: Story[] = [];
  storyViewModels: StoryViewModel[] = [];
  displayedColumns: string[] = ['id', 'by', 'title', 'url'];
  innerDisplayedColumns = ['id', 'by', 'text'];
  expandedElement: StoryViewModel | null;
  dataSource = new MatTableDataSource<Story>();
  isLoading = true;

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<
    MatTable<CommentViewModel>
  >;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: StoryService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getStories();
    this.getNewestStoryComments();
  }

  toggleRow(storyElements: StoryViewModel): void {
    storyElements.comments &&
    (storyElements.comments as MatTableDataSource<CommentViewModel>).data.length
      ? (this.expandedElement =
          this.expandedElement === storyElements ? null : storyElements)
      : null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<
          CommentViewModel
        >).sort = this.innerSort.toArray()[index])
    );
  }

  getStories(): void {
    this.service.getStories().subscribe((data: any) => {
      this.stories = data;
      for (let i = 0; data.length > i; i++) {
        const story = data[i];
        const stories = [];
        stories.push(story);
        this.subjectStoryList.next(story);
      }
    });
  }

  // TODO - This is an Anti-pattern/Doesn't work
  getNewestStoryComments(): void {
    this.subjectStoryList.subscribe({
      next: (stories) => {
        stories.forEach((story) => {
          const storyViewModel: StoryViewModel = null;
          story.kids.forEach((commentId) => {
            this.service
              .getCommentsByStoryId(commentId)
              .subscribe((data: any) => {
                storyViewModel.comments = data;
              });
            storyViewModel.by = story.by;
            storyViewModel.id = story.id;
            storyViewModel.title = story.title;
            storyViewModel.url = story.title;
            this.storyViewModels.push(storyViewModel);
          });
        });
      },
    });
  }
}

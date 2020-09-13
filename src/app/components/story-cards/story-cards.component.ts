import { Component, OnInit } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';
import { ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StoryModalComponent } from '../story-modal/story-modal.component';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent implements OnInit {
  private subjectIdList = new ReplaySubject<string[]>();
  private subjectStoryList = new ReplaySubject<Story[]>();
  storyIds: string[] = [];
  stories: Story[] = [];
  pageOfItems: Story[] = [];
  isLoading = true;

  constructor(private service: StoryService, private dialog: MatDialog, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.pageOfItems = this.stories;
    });
    this.getNewestStoryIds();
    this.getNewestStoryIdsList();
    this.getNewestStories();
  }

  onChangePage(pageOfStories: Array<any>): void {
    // Update current page of Stories
    this.pageOfItems = pageOfStories;
  }

  getNewestStoryIds(): any {
    this.service.getStoryIds().subscribe((data: string[]) => {
      this.storyIds = data;
      return data;
    });
    return this.storyIds;
  }

  getNewestStoryIdsList(): void {
    this.service.getStoryIdValues().subscribe((data: string[]) => {
      for (let i = 0; data.length > i; i++) {
        const id = data[i];
        const storyIds = [];
        storyIds.push(id);
        this.subjectIdList.next(storyIds);
      }
    });
  }

  getNewestStories(): void {
    const storyList: Story[] = [];
    const idList: string[] = [];
    let storyId = '';
    this.subjectIdList.subscribe({
      next: (id) => {
        storyId = id.toString();
        idList.push(storyId);
        console.log('StoryId being passed: ' + storyId);
      }
    });
    this.manualDelay(1000).then(() => {
      console.log('ID Length: ' + idList.length);

      idList.forEach((id) => {
        this.service.getStoryById(id).subscribe((data: any) => {
          const story: Story = data;
          if (story !== null) {
            storyList.push(story);
            this.subjectStoryList.next(storyList);
          }
        });
      });
    });

    this.manualDelay(2500).then(() => {
      this.stories = storyList;
      this.isLoading = false;
    });
  }

  async manualDelay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('Thread asleep!'));
  }

  openDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    console.log(dialogConfig.data);
    this.dialog.open(StoryModalComponent, dialogConfig);
  }

}

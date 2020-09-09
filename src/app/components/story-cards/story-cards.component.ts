import { Component, OnInit } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';
import { ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StoryModalComponent } from '../story-modal/story-modal.component';

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
  pageOfItems: Array<any>;

  constructor(private service: StoryService, private dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.getNewestStoryIds();
    this.getNewestStoryIdsList();
    this.getNewestStories();
    this.pageOfItems = this.stories;
  }

  onChangePage(pageOfStories: Array<any>): void {
    // update current page of items
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
    this.subjectIdList.subscribe({
      next: (id) => {
        // console.log('StoryId being passed: ' + id);
        const story = this.service.getStoryById(id.toString());
        const stories = [];
        console.log('Story on Component: ' + story);
        stories.push(story);

        this.subjectStoryList.next(stories);
      }
    });

    let allStories: Story[] = [];
    this.subjectStoryList.subscribe({
      next: (story) => {
        console.log('Story From Subject: ' + story);
        allStories = story;
        this.stories.push(allStories[0]);
        console.log('By: ' + allStories[0].by);
      }
    });

    this.manualDelay(2500).then(() => {
      // this.stories = allStories;
      for (let i = 0; allStories.length > i; i++) {
        const story = allStories[i].url;
        console.log('Story ' + story);
        // allStories.push(story);
      }
      console.log('All Stories: ' + this.stories.length);
    });

  }

  async manualDelay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('Thread asleep!'));
  }

  openDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;
    console.log(dialogConfig.data);
    this.dialog.open(StoryModalComponent, dialogConfig);
  }

}

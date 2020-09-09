import { Component, OnInit } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent implements OnInit {
  private subjectIdList = new ReplaySubject<string[]>();
  private subjectStoryList = new BehaviorSubject<Story[]>([]);
  storyIds: string[] = [];
  stories: Story[] = [];
  pageOfItems: Array<any>;

  constructor(private service: StoryService ) {

   }

  ngOnInit(): void {
    this.getNewestStoryIds();
    this.getNewestStoryIdsAsStrings();
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

  getNewestStoryIdsAsStrings(): void {
    this.service.getStoryIdValues().subscribe((data: string[]) => {
    // this.service.getStoryIds().subscribe((data: string[]) => {
      for (let i = 0; data.length > i; i++) {
        const id = data[i];
        // console.log('Id: ' + id);
        const storyIds = [];
        storyIds.push(id);
        this.subjectIdList.next(storyIds);
      }
    });
    // console.log('Ids as Strings: ' + this.subjectIdList);
    // this.subjectIdList.subscribe({
    //   next: (id) => console.log('Id: ' + id)
    // });
  }

  getNewestStories(): void {
    this.subjectIdList.subscribe({
      next: (id) => {
        const story = this.service.getStoryById(id.toString());
        const stories = [];
        stories.push(story);
        this.subjectStoryList.next(stories);
      }
    });

    const allStories: Story[] = [];
    this.subjectStoryList.subscribe({
      next: (story) => {
        // console.log('Story: ' + story);
        story.forEach(s => {
          allStories.push(s);
        });
        console.log('Stories Length: ' + allStories.length);
      }
    });

    this.manualDelay(2500).then(() => {
      this.stories = allStories;
      console.log('All Stories: ' + this.stories);
    });

  }

  async manualDelay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('Thread asleep!'));
}

}

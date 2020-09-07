import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent implements OnInit {
  storyIds: string[] = [];
  stories: any[] = [];
  pageOfItems: Array<any>;

  constructor(private service: StoryService ) {

   }

  ngOnInit(): void {
    this.getNewestStoryIds();
    this.pageOfItems = this.storyIds;
    this.storyIds.forEach(id => {
      this.stories.push(this.service.getStoryById(id));
    });
  }

  onChangePage(pageOfstoryIds: Array<any>): void {
    // update current page of items
    this.pageOfItems = pageOfstoryIds;
  }

  getNewestStoryIds(): void {
    this.service.getStoryIdsAsync().subscribe((data: string[]) => {
      this.storyIds = data;
    });
  }

  getNewestStories(storyIds: string[]): void {
    // storyIds.forEach((id) => {
    //   this.service.getStoryById(id).subscribe((data: any) => {
    //     this.stories = data;
    //   });
    // });
  }

}

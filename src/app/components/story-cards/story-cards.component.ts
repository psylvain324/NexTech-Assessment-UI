import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-cards',
  templateUrl: './story-cards.component.html',
  styleUrls: ['./story-cards.component.css']
})
export class StoryCardsComponent implements OnInit {
  storyIds: string[] = [];
  stories: Observable<Story[]>;
  pageOfItems: Array<any>;

  constructor(private service: StoryService ) {

   }

  ngOnInit(): void {
    this.getNewestStoryIds();
    this.getNewestStories();
    this.pageOfItems = this.storyIds;
    console.log('Items: ' + this.stories);
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

  getNewestStories(): void {
    this.service.getStoryIdValues().subscribe((data: string[]) => {
      data.map(id => {
        const story = this.service.getStoryById(id);
        console.log('Story: ' + story);
        // TODO - Finish this.
      });
    });
  }

}

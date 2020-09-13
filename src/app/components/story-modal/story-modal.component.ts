import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Story } from 'src/app/interfaces/story.model';
import { StoryService } from '../../services/story-service/story.service';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html',
  styleUrls: ['./story-modal.component.css']
})
export class StoryModalComponent implements OnInit {
  title = 'Full Story Details';
  story: Story;
  rowData: string;

  constructor(@Inject(MAT_DIALOG_DATA) data, private service: StoryService) {
     this.rowData = data;
   }

  ngOnInit(): void {
    this.getCurrentStory();
  }

  getCurrentStory(): void {
    this.service.getStoryById(this.rowData).subscribe((data: any) => {
      this.story = data;
    });
  }

}

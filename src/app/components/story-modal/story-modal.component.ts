import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Story } from 'src/app/interfaces/story.model';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html',
  styleUrls: ['./story-modal.component.css']
})
export class StoryModalComponent implements OnInit {
  rowData: Story;
  public columnDefs;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
     this.rowData = data;
   }

  ngOnInit(): void {

  }
}

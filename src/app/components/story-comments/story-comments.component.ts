import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story-service/story.service';
import { TreeNode } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.css'],
})
export class StoryCommentsComponent implements OnInit {
  stories: TreeNode[];
  comments: TreeNode[];
  records: TreeNode[];
  cols: any[];
  totalRecords: number;
  loading: boolean;

  constructor(
    private service: StoryService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cols = [
      { field: 'title', header: 'Title', type: 'parent' },
      { field: 'url', header: 'Url', type: 'parent' },
      { field: 'id', header: 'Id', type: 'common' },
      { field: 'time', header: 'Time', type: 'common' },
      { field: 'text', header: 'Text', type: 'child' },
    ];

    this.totalRecords = 500;
    this.loading = true;
  }

  // TODO - Work on this after easier implementation
  loadNodes(event): void {
    this.loading = true;
    this.service.getNewStoriesTree()
      .then((data) => {
        this.stories = data;
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    setTimeout(() => {
      this.loading = false;
      this.records = [];
      this.stories = [];
      this.comments = [];
      let fullRecord;

      for (let i = 0; i < event.rows; i++) {
        if (event.first + i !== null && event.first + i !== '') {
          const node = {
            story: {
              title: event.first + i,
              url: event.first + i,
              id: event.first + i,
              time: event.first + i,
            },
            leaf: false,
          };

          this.stories.push(node);
          fullRecord = node;
        }
        if (event.first + i !== null && event.first + i !== '') {
          const node = {
            comment: {
              id: event.first + i + 2,
              time: event.first + i + 2,
              text: event.first + i + 2,
            },
            leaf: true,
            ...fullRecord,
          };
          this.comments.push(node);
          this.records.push(node);
        }
      }
    }, 1000);
  }

  onNodeExpand(event): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      const node = event.node;

      // TODO - After loadNodes working.
      // Get Id From node
      // Use Id to call service for Comments
      // Set the comments object to response
      // Fill in record details
      // Update UI results

      this.records = [...this.records];
    }, 250);
  }
}

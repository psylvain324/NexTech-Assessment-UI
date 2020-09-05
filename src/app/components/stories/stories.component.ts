import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoriesService } from '../../services/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  dataSource = new MatTableDataSource<Story>();
  storyIds: string[] = [];
  stories: Story[] = [];

  displayedColumns: string[] = [
    'by',
    'name'
  ];

  @ViewChild(MatSort, {static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private service: StoriesService) { }

  ngOnInit() {
    this.getNewestStoryIds();
    this.getNewestStories(this.storyIds);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getNewestStoryIds() {
    this.service.getNewestStoryIds().subscribe((data: any) => {
      this.storyIds = data;
    });
  }

  getNewestStories(storyIds: string[]) {
    storyIds.forEach((id) => {
      this.service.getStoryById(id).subscribe((data: any) => {
        this.stories = data;
      });
    });
  }

}

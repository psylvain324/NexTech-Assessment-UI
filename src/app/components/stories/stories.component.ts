import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoryService } from '../../services/story-service/story.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  animations: []
})
export class StoriesComponent implements OnInit {
  dataSource = new MatTableDataSource<Story>();
  storyIds: string[] = [];
  stories: Story[] = [];

  displayedColumns: string[] = [
    'by',
    'title',
    'url'
  ];

  @ViewChild(MatSort, {static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private service: StoryService) { }

  ngOnInit(): void {
    this.getTestStories();
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getTestStories(): void {
    this.service.getStories().subscribe((data: any) => {
      this.stories = data;
      this.dataSource = new MatTableDataSource<Story>(
        this.stories
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  getNewestStoryIds(): void {
    this.service.getStoryIds().subscribe((data: string[]) => {
      this.storyIds = data;
    });
  }

  getNewestStories(storyIds: string[]): void {
    storyIds.forEach((id) => {
      this.service.getStoryById(id).subscribe((data: any) => {
        this.stories = data;
      });
    });
  }

}

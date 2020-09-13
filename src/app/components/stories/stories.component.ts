import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../../interfaces/story.model';
import { FilterOptions } from '../../interfaces/filter-option.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoryService } from '../../services/story-service/story.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
  animations: []
})
export class StoriesComponent implements OnInit {
  title = 'Hacker Noon Story Feed';
  filteredList = [];
  filterOptionsList: FilterOptions[] = [];
  dataSource = new MatTableDataSource<Story>();
  titleSearch = new FormControl();
  wildCardSearch = new FormControl();
  storyIds: string[] = [];
  stories: Story[] = [];
  storiesRef: Story[] = [];
  isLoading = true;

  displayedColumns: string[] = [
    'by',
    'title',
    'url',
    'time'
  ];

  @ViewChild(MatSort, {static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private service: StoryService) { }

  ngOnInit(): void {
    this.getStories();
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getStories(): void {
    this.service.getStories().subscribe((data: any) => {
      this.stories = data;
      this.storiesRef = this.stories;
      this.dataSource = new MatTableDataSource<Story>(
        this.stories
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
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

  search(): void {
    this.filteredList = this.stories;
    this.filterOptionsList.push({
      searchText: this.titleSearch.value,
      fieldName: 'title'
    });

    this.filteredList = this.service.transformMultipleFilters(
      this.filteredList,
      this.filterOptionsList
    );

    this.stories = this.filteredList;
    this.dataSource = new MatTableDataSource<Story>(
      this.stories
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }

  clear(): void {
    this.titleSearch.reset();
    this.wildCardSearch.reset();
    this.stories = this.storiesRef;
    this.dataSource = new MatTableDataSource<Story>(
      this.stories
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }

}

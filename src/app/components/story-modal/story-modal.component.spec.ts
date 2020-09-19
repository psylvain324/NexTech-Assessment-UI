import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoryModalComponent } from './story-modal.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryService } from '../../services/story-service/story.service';
import { Story } from 'src/app/interfaces/story.model';
import { By } from '@angular/platform-browser';

describe('StoryModalComponent', () => {
  let component: StoryModalComponent;
  let fixture: ComponentFixture<StoryModalComponent>;
  let httpClient: HttpClient;
  let service: StoryService;

  const testData: Story = {
    by: 'Phil',
    descendants: 1,
    kids: [123],
    score: 100,
    time: '0171990',
    title: 'Tech Assessment',
    type: 'Test',
    id: '123',
    url: 'www.test1.com',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(StoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryModalComponent);
    component = fixture.componentInstance;
    component.story = testData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.innerHTML).toBe('Full Story Details');
  });

  it('should display the story', () => {
    expect(component.story).toBe(testData);
  });

  it('should call Story Service on ngInit()', () => {
    spyOn(component, 'getCurrentStory');
    component.ngOnInit();
    expect(component.getCurrentStory).toHaveBeenCalledTimes(1);
  });
});

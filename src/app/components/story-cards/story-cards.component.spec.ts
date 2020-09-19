import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryCardsComponent } from './story-cards.component';
import { MaterialModule } from '../../shared/material.module';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StoryCardsComponent', () => {
  let component: StoryCardsComponent;
  let fixture: ComponentFixture<StoryCardsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [StoryCardsComponent],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

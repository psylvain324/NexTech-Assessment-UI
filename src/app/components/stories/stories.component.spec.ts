import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { StoriesComponent } from './stories.component';
import { MaterialModule } from '../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { By } from '@angular/platform-browser';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      imports: [ MaterialModule, HttpClientTestingModule, BrowserAnimationsModule ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.innerHTML).toBe(' Hacker Noon Story Feed ');
  });

  it('should work', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(4);
  });

  it('should clear input texts when clear button clicked', async () => {
    const clearButton = await loader.getHarness(MatButtonHarness.with({selector: '#clear'}));
    spyOn(clearButton, 'click');
    spyOn(component, 'clear');
    await clearButton.click();
    await component.clear();
    expect(component.clear).toHaveBeenCalled();
  });
});

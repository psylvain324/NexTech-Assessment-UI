import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { StoriesComponent } from './stories.component';
import { MaterialModule } from '../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HarnessLoader } from '@angular/cdk/testing';
// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { MatButtonHarness } from '@angular/material/button/testing';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  // let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      imports: [ MaterialModule, HttpClientTestingModule, BrowserAnimationsModule ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    // loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should clear input texts when clear button clicked', async () => {
  //   const clearButton = await loader.getHarness(MatButtonHarness.with({text: 'Clear'}));
  //   await clearButton.click();
  //   expect(fixture.componentInstance.clear()).toHaveBeenCalled();
  // });
});

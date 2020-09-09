import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwPaginationModule } from 'jw-angular-pagination';

import { MaterialModule } from './shared/material.module';
import { StoriesComponent } from './components/stories/stories.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { StoryCardsComponent } from './components/story-cards/story-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryModalComponent } from './components/story-modal/story-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    NavMenuComponent,
    StoryCardsComponent,
    StoryModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    JwPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

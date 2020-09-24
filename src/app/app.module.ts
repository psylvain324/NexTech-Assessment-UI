import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwPaginationModule } from 'jw-angular-pagination';

import {TreeTableModule} from 'primeng/treetable';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ContextMenuModule} from 'primeng/contextmenu';

import { MaterialModule } from './shared/material.module';
import { StoriesComponent } from './components/stories/stories.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { StoryCardsComponent } from './components/story-cards/story-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryModalComponent } from './components/story-modal/story-modal.component';
import { FilterPipe } from './components/story-cards/filter.pipe';
import { StoryCommentsComponent } from './components/story-comments/story-comments.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    NavMenuComponent,
    StoryCardsComponent,
    StoryModalComponent,
    FilterPipe,
    StoryCommentsComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    JwPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TreeTableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

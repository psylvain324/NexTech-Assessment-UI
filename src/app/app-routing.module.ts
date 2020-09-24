import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryCardsComponent } from './components/story-cards/story-cards.component';
import { StoryCommentsComponent } from './components/story-comments/story-comments.component';
import { CommentsComponent } from './components/comments/comments.component';

const routes: Routes = [
  { path: '', redirectTo: '/stories', pathMatch: 'full' },
  { path: 'stories', component: StoriesComponent },
  { path: 'story-cards', component: StoryCardsComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'story-comments-tree', component: StoryCommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

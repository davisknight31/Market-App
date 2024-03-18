import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DetailsComponent } from './modules/details/details.component';
import { AboutComponent } from './modules/about/about.component';
import { NewsComponent } from './modules/news/news.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details/:stock', component: DetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

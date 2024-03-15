import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DetailsComponent } from './modules/details/details.component';
import { AboutComponent } from './modules/about/about.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'details/:stock', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

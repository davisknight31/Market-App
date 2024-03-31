import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DetailsComponent } from './modules/details/details.component';
import { AboutComponent } from './modules/about/about.component';
import { NewsComponent } from './modules/news/news.component';
import { WatchlistComponent } from './modules/watchlist/watchlist.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details/:stock', component: DetailsComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'news', component: NewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

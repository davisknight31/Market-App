import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DetailsComponent } from './modules/details/details.component';
import { AboutComponent } from './modules/about/about.component';
import { NewsComponent } from './modules/news/news.component';
import { WatchlistComponent } from './modules/watchlist/watchlist.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './modules/login/login.component';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [loginGuard] },
  {
    path: 'details/:stock/:symbolid',
    component: DetailsComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'watchlists',
    component: WatchlistComponent,
    canActivate: [loginGuard],
  },
  { path: 'news', component: NewsComponent, canActivate: [loginGuard] },
  { path: 'about', component: AboutComponent, canActivate: [loginGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [loginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

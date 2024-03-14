import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PageFooterComponent } from './shared/components/page-footer/page-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, PageFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Market-Trading-App';
}

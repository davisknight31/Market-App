import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NewsArticles } from '../../shared/interfaces/newsArticles';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  newsArticles: NewsArticles;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNewsArticles();
  }

  getNewsArticles(): void {
    this.apiService.GetNewsArticles().subscribe((response: NewsArticles) => {
      this.newsArticles = response;
      console.log(response);
      this.isLoading = false;
    });
  }
}

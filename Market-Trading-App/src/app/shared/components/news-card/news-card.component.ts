import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { NewsArticles } from '../../interfaces/newsArticles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  newsArticles: NewsArticles;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNewsArticles();
  }

  getNewsArticles(): void {
    this.apiService.GetNewsArticles().subscribe((response: NewsArticles) => {
      this.newsArticles = response;
      console.log(response);
    });
  }
}

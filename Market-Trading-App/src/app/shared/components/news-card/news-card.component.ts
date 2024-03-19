import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { NewsArticles } from '../../interfaces/newsArticles';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  newsArticles: NewsArticles;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNewsArticles();
  }

  getNewsArticles(): void {
    this.apiService.GetNewsArticles().subscribe((response: NewsArticles) => {
      this.newsArticles = response;
      this.isLoading = false;
    });
  }

  truncateText(text: string) {
    length = 75;
    if (text.length <= length) {
      return text;
    }

    return text.substring(0, length) + '\u2026';
  }
}

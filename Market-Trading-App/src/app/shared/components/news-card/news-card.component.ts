import { Component, HostListener } from '@angular/core';
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
  articlesToShow: number = 6;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNewsArticles();
    this.updateArticlesToShow(window.innerWidth);
  }

  getNewsArticles(): void {
    this.apiService.getNewsArticles().subscribe((response: NewsArticles) => {
      this.newsArticles = response;
      this.isLoading = false;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateArticlesToShow(event.target.innerWidth);
  }

  updateArticlesToShow(width: number) {
    if (width >= 1800) {
      this.articlesToShow = 7;
    } else if (width >= 1200) {
      this.articlesToShow = 6;
    } else if (width >= 992) {
      this.articlesToShow = 5;
    } else if (width >= 768) {
      this.articlesToShow = 4;
    } else if (width >= 500) {
      this.articlesToShow = 3;
    } else {
      this.articlesToShow = 2;
    }
  }

  truncateText(text: string) {
    length = 40;
    if (text.length <= length) {
      return text;
    }

    return text.substring(0, length) + '\u2026';
  }
}

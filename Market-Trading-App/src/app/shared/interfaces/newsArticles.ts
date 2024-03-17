export interface NewsArticles {
  news: NewsItem[];
  nextPageToken: string;
}

interface NewsItem {
  author: string;
  content: string;
  createdAt: Date;
  headline: string;
  id: number;
  images: Image[];
  source: string;
  summary: string;
  symbols: string[];
  updatedAt: Date;
  url: string;
}

interface Image {
  size: string;
  url: string;
}

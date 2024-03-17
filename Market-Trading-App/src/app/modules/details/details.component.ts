import { Component, Input } from '@angular/core';
import { Stock } from '../../shared/interfaces/stock';
import { Overview } from '../../shared/interfaces/overview';
import { Data } from '../../shared/interfaces/data';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoCardComponent } from './general-info-card/general-info-card.component';
import { ApiService } from '../../core/services/api.service';
import { FinancialInfoCardComponent } from './financial-info-card/financial-info-card.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [GeneralInfoCardComponent, FinancialInfoCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  // @Input() stock?: Stock;
  @Input() stockSymbol?: string;

  companyOverview: Overview;
  stockData: Data;
  cachedStock: Stock;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.paramMap.get('stock');
    // this.stock = JSON.parse(stockParameter!) as Stock;
    // this.getCompanyOverview();
    this.getStockData();
    this.getPriceInfoFromCachedData();
  }

  getPriceInfoFromCachedData(): void {
    this.apiService.cachedData.forEach((cache) => {
      if (cache.name === this.stockSymbol) {
        console.log(cache);
        this.cachedStock = cache;
      }
    });
  }

  getStockData(): void {
    this.apiService
      .getStockDataBySymbol(this.stockSymbol)
      .subscribe((response: Data) => {
        this.stockData = response;
        console.log(response);
      });
  }

  // getCompanyOverview(): void {
  //   this.apiService
  //     .getCompanyOverviewBySymbol(this.stockSymbol)
  //     .subscribe((response: Overview) => {
  //       this.companyOverview = response;
  //       console.log(response);
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.companyOverview.unsubscribe();
  // }
}

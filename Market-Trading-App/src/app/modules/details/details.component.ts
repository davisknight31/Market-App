import { Component, Input } from '@angular/core';
import { Stock, StockOld } from '../../shared/interfaces/stock';
import { Data } from '../../shared/interfaces/data';
import { Profile } from '../../shared/interfaces/profile';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoCardComponent } from './general-info-card/general-info-card.component';
import { ApiService } from '../../core/services/api.service';
import { FinancialInfoCardComponent } from './financial-info-card/financial-info-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    GeneralInfoCardComponent,
    FinancialInfoCardComponent,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  // @Input() stock?: Stock;
  @Input() stockSymbol?: string;

  stockData: Data;
  chosenStock: Stock;
  companyProfile: Profile;
  isLoading: boolean = true;
  // add is loading for each call, and use that to determine if spinner should disappear

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.paramMap.get('stock');
    // this.stock = JSON.parse(stockParameter!) as Stock;
    // this.getCompanyOverview();
    this.getStockPrice(this.stockSymbol);
    // this.getStockData();
    // this.getCompanyProfile();
    this.combineApisAndLoad();
    window.scrollTo(0, 0);
  }

  combineApisAndLoad(): void {
    this.isLoading = true;

    const combinedObservables: Observable<any>[] = [
      this.apiService.getStockDataBySymbol(this.stockSymbol),
      this.apiService.GetCompanyProfileBySymbol(this.stockSymbol),
    ];

    forkJoin(combinedObservables).subscribe({
      next: (responses) => {
        console.log(responses);
        this.stockData = responses[0];
        this.companyProfile = responses[1];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('error fetching', error);
      },
    });
  }

  // getPriceInfoFromCachedData(): void {
  //   this.apiService.cachedData.forEach((cache) => {
  //     if (cache.name === this.stockSymbol) {
  //       console.log(cache);
  //       this.cachedStock = cache;
  //     }
  //   });
  // }

  getStockPrice(stockSymbol: string): void {
    const symbolInList: string[] = [];
    symbolInList.push(stockSymbol);
    let responseData = [];

    this.apiService.getStocks(symbolInList).subscribe((response: Stock[]) => {
      responseData = response;
      this.chosenStock = responseData[0];
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

  getCompanyProfile(): void {
    this.apiService
      .GetCompanyProfileBySymbol(this.stockSymbol)
      .subscribe((response: Profile) => {
        this.companyProfile = response;
        console.log(response);
      });
  }

  // ngOnDestroy(): void {
  //   this.companyOverview.unsubscribe();
  // }
}

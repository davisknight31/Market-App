import { Component, Input } from '@angular/core';
import { Stock } from '../../shared/interfaces/stock';
import { Data } from '../../shared/interfaces/data';
import { Profile } from '../../shared/interfaces/profile';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoCardComponent } from './general-info-card/general-info-card.component';
import { ApiService } from '../../core/services/api.service';
import { FinancialInfoCardComponent } from './financial-info-card/financial-info-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';

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
  cachedStock: Stock;
  companyProfile: Profile;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.paramMap.get('stock');
    // this.stock = JSON.parse(stockParameter!) as Stock;
    // this.getCompanyOverview();
    this.getStockData();
    this.getPriceInfoFromCachedData();
    this.getCompanyProfile();
    window.scrollTo(0, 0);
    this.isLoading = false;
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

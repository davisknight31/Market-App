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
import { Observable, forkJoin } from 'rxjs';
import { CompanyDescription } from '../../shared/interfaces/companyDescription';
import { DescriptionCardComponent } from './description-card/description-card.component';
import { ChartCardComponent } from './chart-card/chart-card.component';
import {
  FormattedHistoricalBar,
  HistoricalBars,
} from '../../shared/interfaces/bars';
import { CardComponent } from '../../shared/components/card/card.component';
import { TradeComponent } from './trade/trade.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    GeneralInfoCardComponent,
    FinancialInfoCardComponent,
    SpinnerComponent,
    CommonModule,
    DescriptionCardComponent,
    ChartCardComponent,
    CardComponent,
    TradeComponent,
    TradeComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() stockSymbol?: string;
  @Input() symbolId?: number;

  stockData: Data;
  chosenStock: Stock;
  companyProfile: Profile;
  companyDescription: CompanyDescription;
  historicalBars: HistoricalBars;
  formattedHistoricalBars: FormattedHistoricalBar[] = [];
  isLoading: boolean = true;
  // add is loading for each call, and use that to determine if spinner should disappear

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.paramMap.get('stock');
    this.symbolId = parseInt(this.route.snapshot.paramMap.get('symbolid'));

    this.getStockPrice(this.stockSymbol);
    this.combineApisAndLoad();
    window.scrollTo(0, 0);
  }

  combineApisAndLoad(): void {
    this.isLoading = true;

    const combinedObservables: Observable<any>[] = [
      this.apiService.getStockDataBySymbol(this.stockSymbol),
      this.apiService.GetCompanyProfileBySymbol(this.stockSymbol),
      this.apiService.getCompanyDescription(this.stockSymbol),
      this.apiService.getHistoricalBars(this.stockSymbol),
    ];

    forkJoin(combinedObservables).subscribe({
      next: (responses) => {
        this.stockData = responses[0];
        this.companyProfile = responses[1];
        this.companyDescription = responses[2];
        this.historicalBars = responses[3];
        this.historicalBars.bars.forEach((bar) => {
          let formattedBar: FormattedHistoricalBar = {
            time: bar.t.toString().split('T')[0],
            value: bar.c,
          };
          this.formattedHistoricalBars.push(formattedBar);
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('error fetching', error);
      },
    });
  }

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
      });
  }

  getCompanyProfile(): void {
    this.apiService
      .GetCompanyProfileBySymbol(this.stockSymbol)
      .subscribe((response: Profile) => {
        this.companyProfile = response;
      });
  }
}

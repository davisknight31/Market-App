import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Stock, StockOld } from '../../shared/interfaces/stock';
import { ApiService } from '../../core/services/api.service';
import { NgIf } from '@angular/common';
import { Observable, forkJoin, share } from 'rxjs';
import { NewsCardComponent } from '../../shared/components/news-card/news-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableFilterService } from '../../core/services/table-filter.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { MainListComponent } from './main-list/main-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { CurrentAssetsComponent } from './current-assets/current-assets.component';
import { UserService } from '../../core/services/user.service';
import { TradesimChoice } from '../../shared/interfaces/tradesimChoice';
import { Share } from '../../shared/interfaces/share';
import { OwnedAsset } from '../../shared/interfaces/ownedAsset';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    TableComponent,
    NgIf,
    NewsCardComponent,
    SpinnerComponent,
    SidebarComponent,
    CardComponent,
    MainListComponent,
    WelcomeComponent,
    PortfolioOverviewComponent,
    CurrentAssetsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  responseData: StockOld[] = [];
  stockSymbols: string[] = [];
  tableColumnHeaders: string[] = [];
  isLoading: boolean = true;
  isDataCached: boolean = false;
  tradesimsChoices: TradesimChoice[];
  stockDetails: Stock[] = [];
  topMovers: Stock[] = [];
  mostActive: Stock[] = [];
  balance: number;
  loggedIn: boolean;
  username: string;
  shares: Share[];
  ownedAssets: OwnedAsset[] = [];
  highestPerformer: OwnedAsset;
  lowestPerformer: OwnedAsset;
  totalPortfolioValue: number = 0;

  constructor(
    private apiService: ApiService,
    public tableFilterService: TableFilterService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.tableColumnHeaders.push(
      'Name',
      'Current Price',
      'Change',
      '% Change',
      'Daily High',
      'Daily Low',
      'Open Price',
      'Previous Close'
    );
    this.getTopMovers();
    this.getMostActive();
    this.getStocks();
    this.tableFilterService.selectedStockList = 'tradesimChoice';
    this.username = this.userService.username;
    this.balance = this.userService.balance;
    this.loggedIn = this.userService.loggedIn;
    this.shares = this.userService.shares;
  }

  getStocks(): void {
    // const observables: Observable<any>[] = [];
    this.responseData = [];

    this.apiService
      .getTradesimsChoices()
      .subscribe((response: TradesimChoice[]) => {
        this.tradesimsChoices = response;
        this.tradesimsChoices.forEach((entry) => {
          this.stockSymbols.push(entry.symbol);
        });
        this.apiService
          .getStocks(this.stockSymbols)
          .subscribe((response: Stock[]) => {
            this.stockDetails = response;
            console.log('home hit', response);
            console.log(this.userService.shares);
            if (this.userService.loggedIn) {
              this.userService.shares.forEach((share) => {
                const ownedStock = this.tradesimsChoices.find(
                  (stock) => stock.symbolid === share.symbolid
                );
                // console.log(share.sharesId);
                console.log(ownedStock);

                const ownedStockDetails = this.stockDetails.find(
                  (stock) => stock.symbol === ownedStock.symbol
                );

                const asset: OwnedAsset = {
                  symbolId: ownedStock.symbolid,
                  symbol: ownedStock.symbol,
                  price: ownedStockDetails.price,
                  shares: share.quantity,
                  averagePurchasePrice: share.averagepurchaseprice,
                };

                this.ownedAssets.push(asset);
              });
            }

            this.findHighestPerformer();
            this.findLowestPerformer();
            this.calculateTotalPortfolioValue();

            // this.highestPerformer = this.ownedAssets[0];
            // this.ownedAssets.forEach((asset) => {
            //   if (
            //     asset.price - asset.averagePurchasePrice >
            //     this.highestPerformer.price -
            //       this.highestPerformer.averagePurchasePrice
            //   ) {
            //     this.highestPerformer = asset;
            //   }
            // });

            this.isLoading = false;
          });
      });
  }

  findHighestPerformer(): void {
    this.highestPerformer = this.ownedAssets[0];
    this.ownedAssets.forEach((asset) => {
      if (
        asset.price - asset.averagePurchasePrice >
        this.highestPerformer.price - this.highestPerformer.averagePurchasePrice
      ) {
        this.highestPerformer = asset;
      }
    });
  }

  findLowestPerformer(): void {
    this.lowestPerformer = this.ownedAssets[0];
    this.ownedAssets.forEach((asset) => {
      if (
        asset.price - asset.averagePurchasePrice <
        this.lowestPerformer.price - this.lowestPerformer.averagePurchasePrice
      ) {
        this.lowestPerformer = asset;
      }
    });
  }

  calculateTotalPortfolioValue() {
    this.ownedAssets.forEach((asset) => {
      this.totalPortfolioValue += asset.price * asset.shares;
    });
  }

  getTopMovers(): void {
    this.apiService.getTopMovers().subscribe((response: Stock[]) => {
      this.topMovers = response;
      console.log(response);
    });
  }

  getMostActive(): void {
    this.apiService.getMostActive().subscribe((response: Stock[]) => {
      this.mostActive = response;
      console.log(response);
    });
  }

  // formatData() {}
}

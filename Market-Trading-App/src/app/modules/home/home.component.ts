import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Stock } from '../../shared/interfaces/stock';
import { ApiService } from '../../core/services/api.service';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { MainListComponent } from './main-list/main-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PortfolioOverviewComponent } from './portfolio-overview/portfolio-overview.component';
import { CurrentAssetsComponent } from './current-assets/current-assets.component';
import { UserService } from '../../core/services/user.service';
import { TradesimChoice } from '../../shared/interfaces/tradesimChoice';
import { Share } from '../../shared/interfaces/share';
import { OwnedAsset } from '../../shared/interfaces/ownedAsset';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    SpinnerComponent,
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
  private refresh: Subscription;
  stockSymbols: string[] = [];
  isLoading: boolean = true;
  tradesimsChoices: TradesimChoice[];
  stockDetails: Stock[] = [];
  balance: number;
  loggedIn: boolean;
  username: string;
  shares: Share[];
  ownedAssets: OwnedAsset[] = [];
  highestPerformer: OwnedAsset;
  lowestPerformer: OwnedAsset;
  totalPortfolioValue: number = 0;
  totalAveragePurchaseValue: number = 0;
  profitLossDifference: number = 0;
  isInProfit: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.resetStocks();
    this.getStocks();

    // this.refresh = interval(20000).subscribe(() => {
    //   this.getStocks();
    // });
    this.username = this.userService.username;
    this.balance = this.userService.balance;
    this.loggedIn = this.userService.loggedIn;
    this.shares = this.userService.shares;
  }

  getStocks(): void {
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
            console.log(this.stockDetails);

            if (this.userService.loggedIn) {
              this.findOwnedAssets();
              this.findHighestPerformer();
              this.findLowestPerformer();
              this.calculateTotalPortfolioValue();
              this.calculateProfitLoss();
            }

            this.isLoading = false;
          });
      });
  }

  findOwnedAssets(): void {
    this.ownedAssets = [];
    this.userService.shares.forEach((share) => {
      const ownedStock = this.tradesimsChoices.find(
        (stock) => stock.symbolid === share.symbolid
      );

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
    this.totalPortfolioValue = 0;
    this.ownedAssets.forEach((asset) => {
      this.totalPortfolioValue += asset.price * asset.shares;
    });
  }

  calculateProfitLoss() {
    this.profitLossDifference = 0;
    this.totalAveragePurchaseValue = 0;
    this.ownedAssets.forEach((asset) => {
      this.totalAveragePurchaseValue +=
        asset.averagePurchasePrice * asset.shares;
    });
    this.profitLossDifference =
      this.totalPortfolioValue - this.totalAveragePurchaseValue;
    if (this.profitLossDifference > 0) {
      this.isInProfit = true;
    } else {
      this.isInProfit = false;
    }
  }

  // resetStocks() {
  //   this.ownedAssets = [];
  //   this.highestPerformer = null;
  //   this.lowestPerformer = null;
  //   this.totalPortfolioValue = 0;
  //   this.profitLossDifference = 0;
  // }
}

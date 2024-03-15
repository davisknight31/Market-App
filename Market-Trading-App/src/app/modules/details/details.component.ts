import { Component, Input } from '@angular/core';
import { Stock } from '../../shared/interfaces/stock';
import { ActivatedRoute } from '@angular/router';
import { InfoCardComponent } from './info-card/info-card.component';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [InfoCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  // @Input() stock?: Stock;
  @Input() stockSymbol?: string;

  companyOverview;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.paramMap.get('stock');
    // this.stock = JSON.parse(stockParameter!) as Stock;
    this.getCompanyOverview();
  }

  getCompanyOverview(): void {
    this.companyOverview = this.apiService
      .getCompanyOverviewBySymbol(this.stockSymbol)
      .subscribe((response) => {
        console.log(response);
      });
  }

  // ngOnDestroy(): void {
  //   this.companyOverview.unsubscribe();
  // }
}

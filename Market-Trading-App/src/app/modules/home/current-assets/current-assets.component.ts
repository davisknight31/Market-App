import { Component, Input } from '@angular/core';
import { Share } from '../../../shared/interfaces/share';
import { OwnedAsset } from '../../../shared/interfaces/ownedAsset';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-assets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-assets.component.html',
  styleUrl: './current-assets.component.scss',
})
export class CurrentAssetsComponent {
  @Input() loggedIn: boolean;
  @Input() assets: OwnedAsset[];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.assets.length);
  }

  formatNumber(value: number) {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return '$' + Number(value).toLocaleString('en', options);
  }

  navigateToDetails(symbol: string, symbolId: number) {
    this.router.navigate(['/details', symbol, symbolId]);
  }
}

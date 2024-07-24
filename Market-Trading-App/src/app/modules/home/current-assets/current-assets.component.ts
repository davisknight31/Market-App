import { Component, Input } from '@angular/core';
import { Share } from '../../../shared/interfaces/share';
import { OwnedAsset } from '../../../shared/interfaces/ownedAsset';
import { CommonModule } from '@angular/common';

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

  formatNumber(value: number) {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return '$' + Number(value).toLocaleString('en', options);
  }
}

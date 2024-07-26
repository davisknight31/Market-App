import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OwnedAsset } from '../../../shared/interfaces/ownedAsset';

@Component({
  selector: 'app-portfolio-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-overview.component.html',
  styleUrl: './portfolio-overview.component.scss',
})
export class PortfolioOverviewComponent {
  @Input() loggedIn: boolean;
  @Input() highestPerformer: OwnedAsset;
  @Input() lowestPerformer: OwnedAsset;
}

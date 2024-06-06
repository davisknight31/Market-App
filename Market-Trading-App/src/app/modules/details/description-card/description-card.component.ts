import { Component, Input } from '@angular/core';
import { CompanyDescription } from '../../../shared/interfaces/CompanyDescription';
import {
  ColorType,
  IChartApi,
  LineData,
  createChart,
} from 'lightweight-charts';

@Component({
  selector: 'app-description-card',
  standalone: true,
  imports: [],
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.scss',
})
export class DescriptionCardComponent {
  @Input() companyDescription?: CompanyDescription;
}

import { Component, Input } from '@angular/core';
import { CompanyDescription } from '../../../shared/interfaces/companyDescription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.scss',
})
export class DescriptionCardComponent {
  @Input() companyDescription?: CompanyDescription;
  @Input() companyName?: string;
}

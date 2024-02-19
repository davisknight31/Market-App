import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Stock } from '../../shared/interfaces/stock';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  myData: Stock[] = [
    { name: 'Stock 1', price: 50.5, percent: 10 },
    { name: 'Stock 2', price: 50.5, percent: 10 },
    { name: 'Stock 3', price: 50.5, percent: 10 },
    { name: 'Stock 4', price: 50.5, percent: 10 },
    { name: 'Stock 5', price: 50.5, percent: 10 },
    { name: 'Stock 6', price: 50.5, percent: 10 },
    { name: 'Stock 7', price: 50.5, percent: 10 },
    { name: 'Stock 8', price: 50.5, percent: 10 },
    { name: 'Stock 9', price: 50.5, percent: 10 },
    { name: 'Stock 10', price: 50.5, percent: 10 },
    { name: 'Stock 11', price: 50.5, percent: 10 },
    { name: 'Stock 12', price: 50.5, percent: 10 },
    { name: 'Stock 13', price: 50.5, percent: 10 },
    { name: 'Stock 14', price: 50.5, percent: 10 },
    { name: 'Stock 15', price: 50.5, percent: 10 },
    { name: 'Stock 16', price: 50.5, percent: 10 },
    { name: 'Stock 17', price: 50.5, percent: 10 },
    { name: 'Stock 18', price: 50.5, percent: 10 },
    { name: 'Stock 19', price: 50.5, percent: 10 },
    { name: 'Stock 20', price: 50.5, percent: 10 },
    { name: 'Stock 21', price: 50.5, percent: 10 },
  ];
  tableColumnHeaders: string[] = ['Name', 'Price', 'Percent'];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TableItem {
  name: string;
  description: string;
  price: string;
  date: string;
}

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class ResponsiveTableComponent {
  data: TableItem[] = [
    { name: 'Продукт 1', description: 'Опис продукту 1', price: '100 грн', date: '23.02.2025' },
    { name: 'Продукт 2', description: 'Опис продукту 2', price: '200 грн', date: '24.02.2025' },
  ];
}

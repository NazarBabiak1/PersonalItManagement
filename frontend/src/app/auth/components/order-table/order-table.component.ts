import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {DecimalPipe} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';

export interface Order {
  id: number;
  name: string;
  address: string;
  totalPrice: number;
  discount: number;
  paidAmount: number;
  remainingAmount: number;
  orderStatusId: number;
  status: {
    id: number;
    name: string;
  };
  employees: any[];
  payments: any[];
  materials: any[];
  works: any[];
}

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatRow,
    MatHeaderRow,
    MatPaginator,
    DecimalPipe,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatInput,
    MatColumnDef,
    MatSort,
    MatIconButton
  ],
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'totalPrice',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatSort) sort!: MatSort; // Use definite assignment assertion

  ngOnInit() {
    // Приклад даних (замініть на реальні дані з вашого сервера)
    this.dataSource.data = [
      {
        id: 1,
        name: 'Order #001',
        address: '123 Main St',
        totalPrice: 1500.00,
        discount: 100.00,
        paidAmount: 800.00,
        remainingAmount: 600.00,
        orderStatusId: 1,
        status: { id: 1, name: 'In Progress' },
        employees: [],
        payments: [],
        materials: [],
        works: []
      },
      // Додайте більше тестових даних за потребою
    ];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Safe to use here after view initialization
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

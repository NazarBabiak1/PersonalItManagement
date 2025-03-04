import {Component} from '@angular/core';
import {ResponsiveTableComponent} from '../order-table/order-table.component';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ResponsiveTableComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <span>Замовлення</span>
        <button class="add-button" (click)="openOrderDialog()">Додати</button>
      </div>
      <div class="table-container">
        <app-responsive-table></app-responsive-table>
      </div>
    </div>
  `,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  constructor(private dialog: MatDialog) {
  }

  openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '620px', // Збільшено до 620px для узгодженості з шириною сторінки
      height: 'auto',
      panelClass: 'no-round-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Нове замовлення додано:', result);
        // Тут можна додати логіку для додавання замовлення до списку
      }
    });
  }
}

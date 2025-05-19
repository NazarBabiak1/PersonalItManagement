import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Order} from '../../Models/Order';
import {OrderStatus} from '../../Models/OrderStatus';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class OrderDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order; statuses: OrderStatus[] }
  ) {
  }


  getStatusName(statusId: number): string {
    const status = this.data.statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Невідомий статус';
  }

  close(): void {
    this.dialogRef.close();
  }
}

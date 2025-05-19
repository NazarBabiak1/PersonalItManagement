import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Order} from '../../Models/Order';
import {OrderStatus} from '../../Models/OrderStatus';
import {AddEquipmentDialogComponent} from '../add-equipment-dialog/add-equipment-dialog.component';
import {AddMaterialDialogComponent} from '../add-material-dialog/add-material-dialog.component';
import {AddEmployeeDialogComponent} from '../add-employee-dialog/add-employee-dialog.component';
import {AddTransactionDialogComponent} from '../add-transaction-dialog/add-transaction-dialog.component';

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
    @Inject(MAT_DIALOG_DATA) public data: { order: Order; statuses: OrderStatus[] },
    private dialog: MatDialog
  ) {
  }


  getStatusName(statusId: number): string {
    const status = this.data.statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Невідомий статус';
  }

  openAddMaterial() {
    this.dialog.open(AddMaterialDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
  }

  openAddEmployee() {
    this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
  }

  openAddTransaction() {
    this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
  }

  openAddEquipment() {
    this.dialog.open(AddEquipmentDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
  }


  close(): void {
    this.dialogRef.close();
  }
}

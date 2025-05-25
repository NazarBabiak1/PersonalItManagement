import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common'; // Import CurrencyPipe
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Order} from '../../Models/Order';
import {OrderStatus} from '../../Models/OrderStatus';
import {EmployeeService} from '../../services/employee.service';
import {EquipmentService} from '../../services/equipment.service';
import {MaterialService} from '../../services/materials.service';
import {Employee} from '../../Models/Employee';
import {Equipment} from '../../Models/Equipment';
import {Material} from '../../Models/Material';
import {AddEquipmentDialogComponent} from '../add-equipment-dialog/add-equipment-dialog.component';
import {AddMaterialDialogComponent} from '../add-material-dialog/add-material-dialog.component';
import {AddEmployeeDialogComponent} from '../add-employee-dialog/add-employee-dialog.component';
import {AddTransactionDialogComponent} from '../add-transaction-dialog/add-transaction-dialog.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    CurrencyPipe,
    MatIcon,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class OrderDetailsDialogComponent implements OnInit {
  employees: Employee[] = [];
  equipments: Equipment[] = [];
  materials: Material[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order; statuses: OrderStatus[] },
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private equipmentService: EquipmentService,
    private materialService: MaterialService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadResources();
  }

  deleteOrder(): void {
    if (confirm('Ви впевнені, що хочете видалити цей ордер?')) {
      this.orderService.deleteOrder(this.data.order.id).subscribe({
        next: () => {
          this.snackBar.open('Ордер успішно видалено', 'OK', {duration: 3000});
          this.dialogRef.close({deleted: true}); // Повертаємо результат видалення
        },
        error: (err) => {
          this.snackBar.open('Помилка видалення ордера', 'OK', {duration: 3000});
          console.error('Помилка видалення ордера:', err);
        }
      });
    }
  }

  loadResources(): void {
    // Fetch employees for this order
    this.employeeService.getEmployeesByOrderId(this.data.order.id).subscribe({
      next: (employees) => (this.employees = employees),
      error: (err) => console.error('Помилка завантаження працівників:', err)
    });

    // Fetch equipment for this order
    this.equipmentService.getEquipmentsByOrderId(this.data.order.id).subscribe({
      next: (equipments) => (this.equipments = equipments),
      error: (err) => console.error('Помилка завантаження обладнання:', err)
    });

    // Fetch materials for this order
    this.materialService.getMaterialsByOrderId(this.data.order.id).subscribe({
      next: (materials) => (this.materials = materials),
      error: (err) => console.error('Помилка завантаження матеріалів:', err)
    });
  }

  getStatusName(statusId: number): string {
    const status = this.data.statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Невідомий статус';
  }

  openAddMaterial() {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadResources(); // Refresh materials after adding
      }
    });
  }

  openAddEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadResources(); // Refresh employees after adding
      }
    });
  }

  openAddTransaction() {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadResources(); // Refresh if transactions affect displayed data
      }
    });
  }

  openAddEquipment() {
    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      width: '400px',
      data: {orderId: this.data.order.id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadResources(); // Refresh equipment after adding
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

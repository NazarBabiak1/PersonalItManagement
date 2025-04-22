import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {OrderService} from '../../../services/order-controller.service'; // Імпортуємо сервіс
import {Order} from '../../../Models/Order'; // Імпортуємо модель

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, NgIf],
  templateUrl: 'order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent {
  orderForm: FormGroup;
  editingOrder: any = null; // Для редагування (якщо потрібно)

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private orderService: OrderService // Ін'екція сервісу
  ) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      totalPrice: ['', Validators.required],
      discount: ['', Validators.required],
      paidAmount: ['', Validators.required],
      remainingAmount: ['', Validators.required],
      employeesName: ['', Validators.required],
      equipmentsName: ['', Validators.required],
      materialsName: ['', Validators.required],
      worksName: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.orderForm.valid) {
      const newOrder: Order = this.orderForm.value;

      // Використовуємо сервіс для додавання замовлення
      this.orderService.addOrder(newOrder).subscribe(
        (order) => {
          console.log('Замовлення додано:', order);
          this.dialogRef.close(order); // Закриваємо діалог і повертаємо об'єкт
        },
        (error) => {
          console.error('Помилка при додаванні замовлення:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

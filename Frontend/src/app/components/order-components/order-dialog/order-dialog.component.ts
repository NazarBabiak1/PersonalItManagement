import {Component, Inject} from '@angular/core'; // Додаємо Inject для доступу до MAT_DIALOG_DATA
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {OrderService} from '../../../services/order-controller.service';
import {Order} from '../../../Models/Order';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, NgIf],
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent {
  orderForm: FormGroup;
  editingOrder: Order | null = null; // Для редагування, типізований як Order

  // Оголошуємо властивість data, яка буде отримувати дані через MAT_DIALOG_DATA
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: Order | null // Додаємо data як вхідний параметр
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

  ngOnInit() {
    // Використовуємо this.data замість this.dialogRef.componentInstance.data
    if (this.data) {
      this.editingOrder = this.data;
      this.orderForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData: Order = this.orderForm.value;

      if (this.editingOrder && this.editingOrder.id) {
        // Редагування існуючого замовлення
        this.orderService.updateOrder(orderData).subscribe(
          (updatedOrder) => {
            console.log('Замовлення оновлено:', updatedOrder);
            this.dialogRef.close(updatedOrder); // Закриваємо діалог і повертаємо оновлений об'єкт
          },
          (error) => {
            console.error('Помилка при оновленні замовлення:', error);
          }
        );
      } else {
        // Додавання нового замовлення
        this.orderService.addOrder(orderData).subscribe(
          (newOrder) => {
            console.log('Замовлення додано:', newOrder);
            this.dialogRef.close(newOrder); // Закриваємо діалог і повертаємо новий об'єкт
          },
          (error) => {
            console.error('Помилка при додаванні замовлення:', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

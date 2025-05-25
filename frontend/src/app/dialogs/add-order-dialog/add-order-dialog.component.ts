import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderService} from '../../services/order.service';
import {Order} from '../../Models/Order';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class AddOrderDialogComponent {
  orderForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderDialogComponent>,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: number; orderStatusId: number }
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0)]],
      paidAmount: [0, [Validators.min(0)]],
      remainingAmount: [{value: 0, disabled: true}, [Validators.min(0)]]
    });

    this.orderForm.get('totalPrice')?.valueChanges.subscribe(() => this.updateRemainingAmount());
    this.orderForm.get('paidAmount')?.valueChanges.subscribe(() => this.updateRemainingAmount());
    this.orderForm.get('discount')?.valueChanges.subscribe(() => this.updateRemainingAmount());
  }

  updateRemainingAmount(): void {
    const totalPrice = this.orderForm.get('totalPrice')?.value || 0;
    const discount = this.orderForm.get('discount')?.value || 0;
    const paidAmount = this.orderForm.get('paidAmount')?.value || 0;
    const remainingAmount = totalPrice - discount - paidAmount;
    this.orderForm.get('remainingAmount')?.setValue(remainingAmount >= 0 ? remainingAmount : 0);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isLoading = true;
      const newOrder: Order = {
        id: 0,
        boardId: this.data.boardId,
        orderStatusId: this.data.orderStatusId,
        name: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        totalPrice: this.orderForm.get('totalPrice')?.value,
        discount: this.orderForm.get('discount')?.value,
        paidAmount: this.orderForm.get('paidAmount')?.value,
        remainingAmount: this.orderForm.get('remainingAmount')?.value
      };

      this.orderService.addOrder(newOrder).subscribe({
        next: (createdOrder) => {
          this.isLoading = false;
          this.snackBar.open('Замовлення успішно створено!', 'OK', {duration: 3000});
          this.dialogRef.close(createdOrder);
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Помилка створення замовлення', 'OK', {duration: 3000});
          console.error('Помилка створення ордеру:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

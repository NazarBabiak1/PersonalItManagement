import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {PendingTransactionService} from '../../services/pendingtransaction.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ]
})
export class AddTransactionDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    private transactionService: PendingTransactionService,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      photoBase64: ['']
    });
  }

  submit(): void {
    if (this.form.valid) {
      const transactionData = {
        ...this.form.value,
        orderId: this.data.orderId
      };

      this.transactionService.addPendingTransaction(transactionData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          console.error('Помилка додавання транзакції:', err);
          // можеш додати повідомлення для користувача
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

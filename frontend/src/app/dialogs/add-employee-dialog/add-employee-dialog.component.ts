import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
  ]
})
export class AddEmployeeDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const employeeData = {
        ...this.form.value,
        orderId: this.data.orderId
      };

      this.employeeService.addEmployee(employeeData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          console.error('Помилка додавання працівника:', err);
          // тут можна показати повідомлення користувачу
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee.service';
import {UserService} from '../../services/user.service'; // 👈 додай
import {User} from '../../Models/User';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input'; // 👈 додай

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatInput
  ]
})
export class AddEmployeeDialogComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private employeeService: EmployeeService,
    private userService: UserService, // 👈 інжекція
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      percentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.error('Помилка завантаження користувачів:', err)
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
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

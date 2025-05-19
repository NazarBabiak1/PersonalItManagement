import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-equipment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-equipment-dialog.component.html'
})
export class AddEquipmentDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = {...this.form.value, orderId: this.data.orderId};
      this.dialogRef.close(value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

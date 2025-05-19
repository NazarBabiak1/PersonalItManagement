import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MaterialService} from '../../services/materials-controller.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-add-material-dialog',
  templateUrl: './add-material-dialog.component.html',
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
export class AddMaterialDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMaterialDialogComponent>,
    private materialService: MaterialService,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const materialData = {
        ...this.form.value,
        orderId: this.data.orderId
      };

      this.materialService.addMaterial(materialData).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          console.error('Помилка додавання матеріалу:', err);
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}

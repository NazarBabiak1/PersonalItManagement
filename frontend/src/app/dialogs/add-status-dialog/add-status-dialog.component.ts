import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';


@Component({
  selector: 'app-add-status-dialog',
  templateUrl: './add-status-dialog.component.html',
  imports: [
    MatButton,
    MatDialogActions,
    MatError,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    NgIf,
    MatInput,
    MatDialogTitle
  ],
  standalone: true
})
export class AddStatusDialogComponent {
  statusName: string = '';

  constructor(public dialogRef: MatDialogRef<AddStatusDialogComponent>) {
  }

  onSubmit(): void {
    if (this.statusName.trim()) {
      this.dialogRef.close(this.statusName);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

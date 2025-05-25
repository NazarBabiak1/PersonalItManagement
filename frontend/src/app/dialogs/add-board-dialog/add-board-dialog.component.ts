import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-add-board-dialog',
  templateUrl: './add-board-dialog.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle
  ]
})
export class AddBoardDialogComponent {
  boardName: string = '';

  constructor(private dialogRef: MatDialogRef<AddBoardDialogComponent>) {
  }

  onSubmit(): void {
    if (this.boardName.trim()) {
      this.dialogRef.close(this.boardName);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

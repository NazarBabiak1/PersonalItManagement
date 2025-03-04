import {Component} from '@angular/core';
import {OrderDialogComponent} from '../order-components/order-dialog/order-dialog.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    OrderDialogComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}

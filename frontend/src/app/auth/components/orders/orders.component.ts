import { Component } from '@angular/core';
import {OrderTableComponent} from '../order-table/order-table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OrderTableComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}

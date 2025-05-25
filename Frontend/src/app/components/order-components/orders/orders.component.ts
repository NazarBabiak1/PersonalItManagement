import {Component} from '@angular/core';
import {OrderBoardComponent} from '../../order-board/order-board.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  imports: [
    OrderBoardComponent
  ],
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
}

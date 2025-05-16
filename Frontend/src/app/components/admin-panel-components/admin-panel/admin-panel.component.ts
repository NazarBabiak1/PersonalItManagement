import {Component} from '@angular/core';
import {OrderBoardComponent} from '../../order-board/order-board.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    OrderBoardComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}

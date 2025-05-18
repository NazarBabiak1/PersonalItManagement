import {Component, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf} from '@angular/common';

interface Order {
  id: number;
  name: string;
  address: string;
  orderStatusId: number;
}

@Component({
  selector: 'app-order-board',
  templateUrl: './order-board.component.html',
  standalone: true,
  imports: [CdkDropList, NgForOf, CdkDrag, NgClass],
  styleUrls: ['./order-board.component.scss'],
})
export class OrderBoardComponent implements OnInit {
  orders: Order[] = [];
  groupedOrders: { [key: number]: Order[] } = {};
  statuses = [
    {id: 1, name: 'Очікує'},
    {id: 2, name: 'У роботі'},
    {id: 3, name: 'Завершено'},
  ];
  connectedDropLists: string[] = [];

  ngOnInit(): void {
    this.orders = [
      {id: 1, name: 'Замовлення 1', address: 'вул. Шевченка, 12', orderStatusId: 1},
      {id: 2, name: 'Замовлення 2', address: 'вул. Франка, 25', orderStatusId: 1},
      {id: 3, name: 'Замовлення 3', address: 'вул. Грушевського, 8', orderStatusId: 2},
      {id: 4, name: 'Замовлення 4', address: 'вул. Кульпарківська, 33', orderStatusId: 3},
    ];

    this.groupOrdersByStatus();
    this.connectedDropLists = this.statuses.map((s) => `${s.id}`);
  }

  groupOrdersByStatus() {
    this.groupedOrders = {};
    this.statuses.forEach((status) => {
      this.groupedOrders[status.id] = this.orders.filter((o) => o.orderStatusId === status.id);
    });
  }

  onDrop(event: CdkDragDrop<Order[]>, newStatusId: number) {
    const order = event.previousContainer.data[event.previousIndex];

    if (order.orderStatusId !== newStatusId) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      order.orderStatusId = newStatusId;
    }
  }

  statusIcon(statusId: number): string {
    switch (statusId) {
      case 1:
        return '⏳';
      case 2:
        return '⚙️';
      case 3:
        return '✅';
      default:
        return '';
    }
  }
}

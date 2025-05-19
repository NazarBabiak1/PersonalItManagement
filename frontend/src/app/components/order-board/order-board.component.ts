import {Component, OnInit} from '@angular/core';
import {CommonModule, NgClass, NgForOf} from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, transferArrayItem,} from '@angular/cdk/drag-drop';
import {OrderService} from '../../services/order.service';
import {Order} from '../../Models/Order';
import {OrderStatus} from '../../Models/OrderStatus';
import {OrderDetailsDialogComponent} from '../../dialogs/order-details-dialog/order-details-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-order-board',
  templateUrl: './order-board.component.html',
  styleUrls: ['./order-board.component.scss'],
  standalone: true,
  imports: [CommonModule, NgForOf, NgClass, CdkDrag, CdkDropList, DragDropModule, MatDialogModule],
})
export class OrderBoardComponent implements OnInit {
  orders: Order[] = [];
  statuses: OrderStatus[] = [];
  groupedOrders: { [statusId: number]: Order[] } = {};
  connectedDropLists: string[] = [];
  clickedOrder: Order | null = null;

  private boardId = 1;
  private dragStart: MouseEvent | null = null;

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadBoardData();
  }

  loadBoardData(): void {
    this.orderService.getStatusesByBoard(this.boardId).subscribe({
      next: (statuses) => {
        this.statuses = statuses;
        this.connectedDropLists = statuses.map(s => `status-${s.id}`);

        this.orderService.getOrdersByBoard(this.boardId).subscribe({
          next: (orders) => {
            this.orders = orders.filter(order => statuses.some(s => s.id === order.orderStatusId));
            this.groupOrdersByStatus();
          },
          error: (err) => console.error('Помилка завантаження замовлень:', err),
        });
      },
      error: (err) => console.error('Помилка завантаження статусів:', err),
    });
  }

  groupOrdersByStatus(): void {
    this.groupedOrders = {};
    this.statuses.forEach(status => {
      this.groupedOrders[status.id] = this.orders.filter(order => order.orderStatusId === status.id);
    });
  }

  onDrop(event: CdkDragDrop<Order[]>, newStatusId: number): void {
    const order = event.previousContainer.data[event.previousIndex];
    if (order.orderStatusId === newStatusId) return;

    const previousContainerData = [...event.previousContainer.data];
    const previousIndex = event.previousIndex;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const oldStatusId = order.orderStatusId;
    order.orderStatusId = newStatusId;

    this.orderService.updateOrderStatus(order.id, newStatusId).subscribe({
      next: () => {
        this.groupOrdersByStatus();
      },
      error: (err) => {
        console.error('Помилка оновлення статусу:', err);
        // Повертаємо назад
        transferArrayItem(
          event.container.data,
          previousContainerData,
          event.currentIndex,
          previousIndex
        );
        event.previousContainer.data = previousContainerData;
        order.orderStatusId = oldStatusId;
      },
    });
  }

  onOrderMouseDown(event: MouseEvent): void {
    this.dragStart = event;
  }

  onOrderClick(event: MouseEvent, order: Order): void {
    if (!this.dragStart) return;

    const dx = Math.abs(event.clientX - this.dragStart.clientX);
    const dy = Math.abs(event.clientY - this.dragStart.clientY);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      this.openOrderDetails(order);
    }

    this.dragStart = null;
  }

  openOrderDetails(order: Order): void {
    this.clickedOrder = order;
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '500px',
      data: {order, statuses: this.statuses},
    });
  }
  
}

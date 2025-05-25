import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OrderService} from '../../services/order.service';
import {Order} from '../../Models/Order';
import {OrderStatus} from '../../Models/OrderStatus';
import {Board} from '../../Models/Board';
import {OrderDetailsDialogComponent} from '../../dialogs/order-details-dialog/order-details-dialog.component';
import {AddOrderDialogComponent} from '../../dialogs/add-order-dialog/add-order-dialog.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AddStatusDialogComponent} from '../../dialogs/add-status-dialog/add-status-dialog.component';

@Component({
  selector: 'app-order-board',
  templateUrl: './order-board.component.html',
  styleUrls: ['./order-board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    CdkDrag,
    CdkDropList,
    DragDropModule,
    MatDialogModule,
    FormsModule,
  ],
})

export class OrderBoardComponent implements OnInit {
  orders: Order[] = [];
  statuses: OrderStatus[] = [];
  groupedOrders: { [statusId: number]: Order[] } = {};
  connectedDropLists: string[] = [];
  clickedOrder: Order | null = null;

  boards: Board[] = [];
  selectedBoardId: number = 0;

  private dragStart: MouseEvent | null = null;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.orderService.getBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
        if (boards.length > 0) {
          this.selectedBoardId = boards[0].id;
          this.loadBoardData();
        }
      },
      error: (err) => console.error('Помилка завантаження борд:', err),
    });
  }

  onBoardChange(): void {
    this.loadBoardData();
  }

  loadBoardData(): void {
    if (!this.selectedBoardId) return;

    this.orderService.getStatusesByBoard(this.selectedBoardId).subscribe({
      next: (statuses) => {
        this.statuses = statuses;
        this.connectedDropLists = statuses.map(s => `status-${s.id}`);

        this.orderService.getOrdersByBoard(this.selectedBoardId).subscribe({
          next: (orders) => {
            this.orders = orders.filter(order =>
              statuses.some(s => s.id === order.orderStatusId)
            );
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

    const oldStatusId = order.orderStatusId;
    const previousContainerData = [...event.previousContainer.data];
    const previousIndex = event.previousIndex;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    order.orderStatusId = newStatusId;

    this.orderService.updateOrderStatus(order.id, newStatusId).subscribe({
      next: () => this.groupOrdersByStatus(),
      error: (err) => {
        console.error('Помилка оновлення статусу:', err);
        // Відкат змін
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

    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '500px',
      data: {order, statuses: this.statuses},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.deleted) {
        this.orders = this.orders.filter(o => o.id !== order.id);
        this.groupOrdersByStatus();
      }
    });
  }

  openAddOrderDialog(orderStatusId: number): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '500px',
      data: {
        boardId: this.selectedBoardId,
        orderStatusId: orderStatusId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orders.push(result);
        this.groupOrdersByStatus();
      }
    });
  }

  addNewBoard(): void {
    const userId = this.authService.getCurrentUserId();

    const newBoard = {
      id: 0,
      name: 'Нова борда',
      createdDate: new Date().toISOString(),
      createdByUserId: userId
    };

    this.orderService.createBoard(newBoard).subscribe({
      next: (board) => {
        this.boards.push(board);
        this.selectedBoardId = board.id;
        this.loadBoardData();
      },
      error: (err) => console.error('Помилка створення борди:', err),
    });
  }


  addStatusToCurrentBoard(): void {
    if (!this.selectedBoardId) return;

    const dialogRef = this.dialog.open(AddStatusDialogComponent, {
      width: '400px',
      disableClose: true, // Prevents closing by clicking outside
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newStatus = {
          name: result.trim(),
          boardId: this.selectedBoardId,
        };

        this.orderService.createStatus(newStatus).subscribe({
          next: () => this.loadBoardData(),
          error: (err) => console.error('Помилка додавання статусу:', err),
        });
      }
    });
  }

  editStatus(status: OrderStatus): void {
    // TODO: реалізуй логіку редагування
    console.log('Редагування статусу:', status);
  }

  deleteStatus(status: OrderStatus): void {
    const confirmDelete = confirm(`Ви справді хочете видалити статус "${status.name}"?`);
    if (confirmDelete) {
      this.orderService.deleteStatus(status.id).subscribe({
        next: () => {
          this.statuses = this.statuses.filter(s => s.id !== status.id);
          this.groupOrdersByStatus();
        },
        error: (err) => console.error('Помилка видалення статусу:', err),
      });
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderService} from '../../../services/order-controller.service';
import {Order} from '../../../Models/Order';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService], // Додаємо сервіс як провайдер
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit {
  data: Order[] = []; // Ініціалізуємо порожнім масивом
  isLoading: boolean = true; // Індикатор завантаження
  error: string | null = null; // Для обробки помилок

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        // Мапимо дані, додаючи поле expanded
        this.data = orders.map(order => ({
          ...order,
          expanded: false
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Не вдалося завантажити дані. Спробуйте пізніше.';
        this.isLoading = false;
        console.error('Помилка завантаження:', err);
      }
    });
  }

  toggleDetails(item: Order) {
    item.expanded = !item.expanded;
  }
}




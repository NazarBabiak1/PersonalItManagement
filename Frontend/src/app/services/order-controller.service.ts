import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../Models/Order';

@Injectable({
  providedIn: 'root' // Зробить сервіс доступним глобально
})
export class OrderService {
  private apiUrl = 'https://localhost:44394/api/Orders'; // URL вашого бекенда

  constructor(private http: HttpClient) {
  }

  // Додавання нового замовлення
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // Отримання списку замовлень
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, {headers: {'accept': '*/*'}});
  }

  // Оновлення існуючого замовлення (редагування)
  updateOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${order.id}`; // Припускаємо, що у моделі Order є поле id
    return this.http.put<Order>(url, order);
  }

  // Видалення замовлення
  deleteOrder(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

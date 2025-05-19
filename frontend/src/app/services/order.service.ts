import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../Models/Order';
import {OrderStatus} from '../Models/OrderStatus';

@Injectable({providedIn: 'root'})
export class OrderService {
  private apiUrl = 'https://localhost:44394/api/orders';
  private statusUrl = 'https://localhost:44394/api/OrderStatus/board';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrderStatus(orderId: number, newStatusId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}/status/${newStatusId}`, {});
  }


  getStatusesByBoard(boardId: number): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${this.statusUrl}/${boardId}`);
  }

  getOrdersByBoard(boardId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/board/${boardId}`);
  }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Order} from '../Models/Order';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrderService {
  private apiUrl = 'https://localhost:44394/api/orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrder(order: Order): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${order.id}`, order);
  }
}

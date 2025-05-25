import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../Models/Order';
import {OrderStatus} from '../Models/OrderStatus';

@Injectable({providedIn: 'root'})
export class OrderService {
  private apiUrl = 'https://localhost:44394/api/orders';
  private statusUrl = 'https://localhost:44394/api/OrderStatus';
  private boardUrl = 'https://localhost:44394/api/KanbanBoards';

  constructor(private http: HttpClient) {
  }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrdersByBoard(boardId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/board/${boardId}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(orderId: number, newStatusId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}/status/${newStatusId}`, {});
  }


  getStatusesByBoard(boardId: number): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${this.statusUrl}/board/${boardId}`);
  }

  createStatus(status: { name: string, boardId: number }): Observable<OrderStatus> {
    return this.http.post<OrderStatus>(`${this.statusUrl}`, status);
  }

  deleteStatus(statusId: number): Observable<void> {
    return this.http.delete<void>(`${this.statusUrl}/${statusId}`);
  }

  getBoards(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>(this.boardUrl);
  }

  createBoard(board: { name: string, createdDate: string, createdByUserId: string }): Observable<{
    id: number,
    name: string
  }> {
    return this.http.post<{ id: number, name: string }>(this.boardUrl, board);
  }

  addStatusToBoard(boardId: number, statusName: string): Observable<OrderStatus> {
    return this.http.post<OrderStatus>(`${this.boardUrl}/${boardId}/statuses`, {name: statusName});
  }
}

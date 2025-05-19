import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PendingTransactionService {
  private apiUrl = 'https://localhost:44394/api/PendingTransaction';

  constructor(private http: HttpClient) {
  }

  addPendingTransaction(transaction: { userId: string; orderId: number; amount: number; photoBase64: string }) {
    return this.http.post(this.apiUrl, transaction);
  }
}


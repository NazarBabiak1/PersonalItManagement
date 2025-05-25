import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Equipment} from '../Models/Equipment';

@Injectable({
  providedIn: 'root' // Зробить сервіс доступним глобально
})
export class EquipmentService {
  private apiUrl = 'https://localhost:44394/api/Equipments'; // URL з вашого cURL-запиту

  constructor(private http: HttpClient) {
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.apiUrl, {headers: {'accept': '*/*'}});
  }

  getEquipmentsByOrderId(orderId: number): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/byOrder?orderId=${orderId}`, {
      headers: {'accept': '*/*'}
    });
  }

  addEquipment(equipment: { name: string; count: number; price: number; orderId: number }) {
    return this.http.post(this.apiUrl, equipment);
  }
}



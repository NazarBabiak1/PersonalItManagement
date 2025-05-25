import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Material} from '../Models/Material';

@Injectable({
  providedIn: 'root' // Зробить сервіс доступним глобально
})
export class MaterialService {
  private apiUrl = 'https://localhost:44394/api/Materials'; // URL з вашого cURL-запиту

  constructor(private http: HttpClient) {
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl, {headers: {'accept': '*/*'}});
  }

  getMaterialsByOrderId(orderId: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/byOrder?orderId=${orderId}`, {
      headers: {'accept': '*/*'}
    });
  }

  addMaterial(material: { name: string; count: number; price: number; orderId: number }) {
    return this.http.post(this.apiUrl, material);
  }
}

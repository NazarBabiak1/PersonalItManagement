import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Material} from '../Models/Material';

@Injectable({
  providedIn: 'root' // Зробить сервіс доступним глобально
})
export class MaterialService {
  private apiUrl = 'https://localhost:44394/api/Equipments'; // URL з вашого cURL-запиту

  constructor(private http: HttpClient) {
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl, {headers: {'accept': '*/*'}});
  }
}

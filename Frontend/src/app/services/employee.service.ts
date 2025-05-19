import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../Models/Employee';

@Injectable({
  providedIn: 'root' // Зробить сервіс доступним глобально
})
export class EmployeeService {
  private apiUrl = 'https://localhost:44394/api/Employees'; // URL з вашого cURL-запиту

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, {headers: {'accept': '*/*'}});
  }

  addEmployee(employee: { userId: string; orderId: number; percentage: number }) {
    return this.http.post(this.apiUrl, employee);
  }

}

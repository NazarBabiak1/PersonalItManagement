import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-responsive-table',
  standalone: true,
  imports: [CommonModule],
  providers: [EmployeeService], // Додаємо сервіс як провайдер
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit {
  data: Employee[] = []; // Ініціалізуємо порожнім масивом
  isLoading: boolean = true; // Індикатор завантаження
  error: string | null = null; // Для обробки помилок

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        // Мапимо дані, додаючи поле expanded
        this.data = employees.map(employee => ({
          ...employee,
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

  toggleDetails(item: Employee) {
    item.expanded = !item.expanded;
  }
}

export interface Employee {
  id: number;
  userName: string;
  percentage: number;
  expanded?: boolean;
}


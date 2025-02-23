import { Component } from '@angular/core';
import {EmployeeTableComponent} from '../employees-table/employees-table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeTableComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

}

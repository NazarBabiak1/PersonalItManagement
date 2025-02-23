import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Імпортуємо CommonModule для *ngFor

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  jobId: string;
  salary: number;
}

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  standalone: true, // Компонент є автономним
  imports: [CommonModule], // Імпортуємо CommonModule для *ngFor
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  employees: Employee[] = [
    { employeeId: 198, firstName: 'Donald', lastName: 'OConnell', email: 'DOCONNEL', phoneNumber: '650.507.9833', hireDate: '21-JUN-07', jobId: 'SH_CLERK', salary: 2600 },
    { employeeId: 199, firstName: 'Douglas', lastName: 'Grant', email: 'DGRANT', phoneNumber: '650.507.9844', hireDate: '13-JAN-08', jobId: 'SH_CLERK', salary: 2600 },
    { employeeId: 200, firstName: 'Jennifer', lastName: 'Whalen', email: 'JWHALEN', phoneNumber: '515.123.4444', hireDate: '17-SEP-03', jobId: 'AD_ASST', salary: 4400 },
    { employeeId: 201, firstName: 'Michael', lastName: 'Hartstein', email: 'MHARTSTE', phoneNumber: '515.123.5555', hireDate: '17-FEB-04', jobId: 'MK_MAN', salary: 13000 },
    { employeeId: 202, firstName: 'Pat', lastName: 'Fay', email: 'PFAY', phoneNumber: '603.123.6666', hireDate: '17-AUG-05', jobId: 'MK_REP', salary: 6000 },
    { employeeId: 203, firstName: 'Susan', lastName: 'Mavris', email: 'SMAVRIS', phoneNumber: '515.123.7777', hireDate: '07-JUN-02', jobId: 'HR_REP', salary: 6500 },
    { employeeId: 204, firstName: 'Hermann', lastName: 'Baer', email: 'HBAER', phoneNumber: '515.123.8888', hireDate: '07-JUN-02', jobId: 'PR_REP', salary: 10000 },
    { employeeId: 205, firstName: 'Shelley', lastName: 'Higgins', email: 'SHIGGINS', phoneNumber: '515.123.8080', hireDate: '07-JUN-02', jobId: 'AC_MGR', salary: 12008 },
    { employeeId: 206, firstName: 'William', lastName: 'Gietz', email: 'WGIETZ', phoneNumber: '515.123.8181', hireDate: '07-JUN-02', jobId: 'AC_ACCOUNT', salary: 8300 }
  ];
}

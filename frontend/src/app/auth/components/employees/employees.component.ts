import { Component } from '@angular/core';
import { ResponsiveTableComponent } from '../employees-table/employees-table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [ResponsiveTableComponent],
  template: `
    <h1>Співробітники</h1>
    <app-responsive-table></app-responsive-table>
  `
})
export class EmployeesComponent {}

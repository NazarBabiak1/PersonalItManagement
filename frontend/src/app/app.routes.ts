// app.routes.ts

import { Routes } from '@angular/router';
import { OrdersComponent } from "./auth/components/orders/orders.component";
import { AdminPanelComponent } from './auth/components/admin-panel/admin-panel.component';
import { EquipmentComponent } from './auth/components/equipment/equipment.component';
import { EmployeesComponent } from './auth/components/employees/employees.component';
import { MaterialsComponent } from './auth/components/materials/materials.component';
import { ReportsComponent } from './auth/components/reports/reports.component';
import { ProfileComponent } from './auth/components/profile/profile.component';

export const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' }, // За замовчуванням відкривається сторінка "ЗАМОВЛЕННЯ"
  { path: '**', redirectTo: '/orders' } // Обробка неіснуючих маршрутів
];

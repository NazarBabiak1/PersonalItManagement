// app.routes.ts

import {Routes} from '@angular/router';
//import { OrdersComponent }  from './components/orders/orders.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {EquipmentComponent} from './components/equipment/equipment.component';
import {EmployeesComponent} from './components/employees/employees.component';
import {MaterialsComponent} from './components/materials/materials.component';
import {ReportsComponent} from './components/reports/reports.component';
import {ProfileComponent} from './components/profile/profile.component';
import {OrdersComponent} from './components/orders/orders.component';

export const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'materials', component: MaterialsComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  {path: '**', redirectTo: '/orders'}
];

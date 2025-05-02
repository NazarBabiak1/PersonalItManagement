// app.routes.ts

import {Routes} from '@angular/router';
import {AdminPanelComponent} from './components/admin-panel-components/admin-panel/admin-panel.component';
import {EquipmentComponent} from './components/equipment-components/equipment/equipment.component';
import {EmployeesComponent} from './components/employees-components/employees/employees.component';
import {MaterialsComponent} from './components/materials-component/materials/materials.component';
import {ReportsComponent} from './components/reports/reports.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guards';
import {AuthorizationComponent} from './components/auth-components/auth.component';

export const routes: Routes = [
  {path: 'login', component: AuthorizationComponent},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'materials', component: MaterialsComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/equipment', pathMatch: 'full'},
  {path: '**', redirectTo: '/equipment'}
];

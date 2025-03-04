import {Component} from '@angular/core';
import {ResponsiveTableComponent} from '../equipment-table/equipment-table.component';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [ResponsiveTableComponent],
  template: `
    <h1>Обладнання</h1>
    <app-responsive-table></app-responsive-table>
  `
})
export class EquipmentComponent {

}

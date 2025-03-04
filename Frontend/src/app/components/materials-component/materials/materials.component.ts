import {Component} from '@angular/core';
import {ResponsiveTableComponent} from '../materials-table/materials-table.component';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [ResponsiveTableComponent],
  template: `
    <h1>Матеріали</h1>
    <app-responsive-table></app-responsive-table>
  `
})
export class MaterialsComponent {

}

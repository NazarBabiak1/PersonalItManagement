import {Component} from '@angular/core';
import {ResponsiveTableComponent} from '../order-table/order-table.component';
import {KanbanModule} from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ResponsiveTableComponent, KanbanModule],
  template: `
    <app-responsive-table></app-responsive-table>
  `,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  public kanbanData: Object[] = [
    {Id: 'Task 1', Status: 'Open', Summary: 'Design login page', Assignee: 'John'},
    {Id: 'Task 2', Status: 'InProgress', Summary: 'API Integration', Assignee: 'Doe'},
    {Id: 'Task 3', Status: 'Close', Summary: 'Deploy to production', Assignee: 'Smith'}
  ];
  public cardSettings: Object = {
    contentField: 'Summary',
    headerField: 'Id'
  };
}

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {CardSettingsModel} from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  public kanbanData: Object[] = [
    {Id: 'Task 1', Status: 'Open', Summary: 'Design login page', Assignee: 'John'},
    {Id: 'Task 2', Status: 'InProgress', Summary: 'API Integration', Assignee: 'Doe'},
    {Id: 'Task 3', Status: 'Close', Summary: 'Deploy to production', Assignee: 'Smith'}
  ];
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };
}

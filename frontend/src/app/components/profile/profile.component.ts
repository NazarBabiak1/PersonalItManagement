import {Component} from '@angular/core';
import {LoginComponent} from '../auth-components/login/login.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

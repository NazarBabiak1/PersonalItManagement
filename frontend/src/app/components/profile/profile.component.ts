import {Component} from '@angular/core';
import {AuthorizationComponent} from '../auth-components/auth.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AuthorizationComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}

import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, NgClass, NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isUser: boolean = false;
  isMenuOpen: boolean = false;

  constructor() {
    this.checkUserRole();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  checkUserRole(): void {
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'admin') {
      this.isAdmin = true;
    } else if (userRole === 'user') {
      this.isUser = true;
    }
  }
}

// header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgClass, NgIf} from '@angular/common'; // Імпортуємо RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, NgClass, NgIf], // Додаємо RouterModule до imports
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdmin: boolean = false;
  isUser: boolean = false;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor() {
    this.checkUserRole();
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

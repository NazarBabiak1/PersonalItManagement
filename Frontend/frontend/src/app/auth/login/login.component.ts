import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Імпортуємо FormsModule

@Component({
  selector: 'app-login',
  standalone: true,  // Вказуємо, що компонент є standalone
  template: `
    <form (ngSubmit)="onSubmit(loginForm)" #loginForm="ngForm">
      <input type="text" ngModel name="username" placeholder="Username">
      <input type="password" ngModel name="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `,
  imports: [FormsModule],  // Додаємо FormsModule сюди
})
export class LoginComponent {
  onSubmit(form: any) {
    console.log(form.value);
  }
}

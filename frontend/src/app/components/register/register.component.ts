import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showRegisterModal = false;
  isAdmin = true; // Імітація перевірки ролі користувача (у реальному застосунку це має приходити з API)

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['employee', Validators.required]
    });
  }

  // Вхід у систему
  onLogin() {
    if (this.loginForm.valid) {
      console.log('Успішний вхід:', this.loginForm.value);
      // Додати логіку входу
    }
  }

  // Відкриття модального вікна реєстрації
  openRegisterModal() {
    this.showRegisterModal = true;
  }

  // Закриття модального вікна реєстрації
  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  // Обробка реєстрації
  onRegister() {
    if (this.registerForm.valid) {
      console.log('Реєстрація успішна:', this.registerForm.value);
      this.closeRegisterModal(); // Закрити модальне вікно після реєстрації
    }
  }
}

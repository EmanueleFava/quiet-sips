import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  username = '';
  password = '';
  error = false;

  isLogged = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe((success) => {
      if (success) {
        this.error = false;
        this.router.navigate(['/dashboard']);
      } else {
        this.error = true;
      }
    });
  }
}

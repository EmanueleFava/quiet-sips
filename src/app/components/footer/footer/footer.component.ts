import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(@Inject(AuthService) private auth: AuthService) {}

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
}

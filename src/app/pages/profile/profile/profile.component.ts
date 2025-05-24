import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userLogged: User | null = null;
  private sub!: Subscription;
  isLogged = false;
  username = '';

  constructor(
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.reloadAuthStatus();

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    this.userLogged = this.auth.getUser();
    this.username = this.auth.getUsername();

    this.sub = this.auth.authStatus$.subscribe((status) => {
      this.isLogged = status;

      if (!status) {
        this.router.navigate(['/']);
      } else {
        this.userLogged = this.auth.getUser();
        this.username = this.auth.getUsername();
      }
    });
  }
}

import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  menuOpen = false;
  showHamburger = false;

  constructor(
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.updateHamburger();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.updateHamburger();
    }
  }

  updateHamburger() {
    if (typeof window !== 'undefined') {
      this.showHamburger = window.innerWidth <= 768;
      if (!this.showHamburger) {
        this.menuOpen = false;
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

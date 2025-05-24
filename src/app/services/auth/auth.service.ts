import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/User';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private router: Router
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<boolean> {
    if (!this.isBrowser()) return of(false);

    return this.userService.getUsers().pipe(
      map((users) => {
        const userFound = users.find(
          (user: User) =>
            user.username === username && user.password === password
        );

        if (userFound) {
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('user', JSON.stringify(userFound));
          this.authStatusSubject.next(true);
          return true;
        }

        return false;
      })
    );
  }

  logout() {
    if (!this.isBrowser()) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStatusSubject.next(false); // Notifica il logout
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('token');
  }

  reloadAuthStatus(): void {
    const isAuth = this.isAuthenticated();
    this.authStatusSubject.next(isAuth);
  }

  getUsername(): string {
    if (!this.isBrowser()) return '';
    const userLogged = JSON.parse(localStorage.getItem('user') ?? 'null');
    return userLogged?.username ?? '';
  }

  getUser(): User | null {
    if (!this.isBrowser()) return null;
    const userLogged = JSON.parse(localStorage.getItem('user') ?? 'null');
    return userLogged;
  }
}

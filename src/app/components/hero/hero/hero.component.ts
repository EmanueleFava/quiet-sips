import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  isLogged = false;
  username = '';
  private sub!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.sub = this.auth.authStatus$.subscribe((status) => {
      this.isLogged = status;
      this.username = status ? this.auth.getUsername() : '';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

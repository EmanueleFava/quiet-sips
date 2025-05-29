import { Component, Inject, Input, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { User } from '../../models/User';
import { ReviewService } from '../../services/review/review.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-card-review',
  standalone: false,
  templateUrl: './card-review.component.html',
  styleUrl: './card-review.component.scss',
})
export class CardReviewComponent implements OnInit {
  @Input() review: Review | null = null;
  @Input() user: User | null = null;
  userLogged: User | null = null;

  constructor(
    @Inject(AuthService) private auth: AuthService,
    @Inject(UserService) private userService: UserService,
    @Inject(ReviewService) private reviewService: ReviewService
  ) {}

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  onRemove(): void {
    console.log('clicked');
    if (!this.isLoggedIn) {
      console.warn('User not logged in');
      return;
    }

    this.userLogged = this.auth.getUser();

    if (!this.userLogged) {
      console.error('User non loggato');
      return;
    }

    const userReviews = this.userLogged.reviewIds;
    this.userLogged.reviewIds = userReviews?.filter(
      (review) => review !== this.review?.id
    );
    if (this.userLogged.id) {
      this.userService
        .updateUser(this.userLogged, this.userLogged.id)
        .subscribe((data) => console.log(data));
      if (this.review?.id) {
        this.reviewService
          .deleteReview(this.review?.id, this.user?.id || '')
          .subscribe((data) => console.log(data));
      }
      localStorage.setItem('user', JSON.stringify(this.userLogged));
      console.log(
        'Recensione rimossa con successo: ',
        this.userLogged.reviewIds
      );
    }
  }

  ngOnInit(): void {
    this.userLogged = this.auth.getUser();
    console.log('user review id ', this.review?.userId);
    console.log('userLogged id', this.userLogged?.id);
  }
}

import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ReviewService } from '../../services/review/review.service';
import { AuthService } from '../../services/auth/auth.service';
import { Review } from '../../models/Review';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-textarea',
  standalone: false,
  templateUrl: './review-textarea.component.html',
  styleUrl: './review-textarea.component.scss',
})
export class ReviewTextareaComponent implements OnInit, OnDestroy {
  error = false;
  isReviewNew = true;
  userLogged: User | null = null;
  @Input() bookId: string | undefined;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(ReviewService) private reviewService: ReviewService,
    @Inject(AuthService) private auth: AuthService
  ) {}

  reviewForm = new FormGroup({
    reviewText: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.required, this.isNumberValidator]),
  });

  submitted = false;

  get reviewText() {
    return this.reviewForm.get('reviewText');
  }

  get rating() {
    return this.reviewForm.get('rating');
  }

  ngOnInit(): void {
    this.userLogged = this.auth.getUser();
    this.checkUserReview();
    const sub = this.reviewService.reviewRemoved$.subscribe(() => {
      this.checkUserReview();
    });

    this.subscriptions.add(sub);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId'] && this.bookId) {
      this.checkUserReview();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  checkUserReview(): void {
    if (this.userLogged && this.bookId) {
      console.log('Verifica recensione per libro:', this.bookId);
      this.reviewService
        .getUserReviewForBook(this.userLogged.id!, this.bookId)
        .subscribe((existingReview) => {
          this.isReviewNew = !existingReview;
        });
    } else {
      this.isReviewNew = false;
    }
  }

  onSubmit() {
    if (this.reviewForm.valid && this.userLogged && this.bookId) {
      this.reviewService
        .getUserReviewForBook(this.userLogged.id!, this.bookId)
        .subscribe((existingReview) => {
          if (existingReview) {
            this.isReviewNew = false;
            return;
          }

          const formValues = this.reviewForm.value;
          const review: Review = {
            id: crypto.randomUUID(),
            userId: this.userLogged?.id || '',
            bookId: this.bookId || '',
            rating: parseFloat(formValues.rating!) ?? 0,
            description: formValues.reviewText ?? '',
          };

          this.reviewService.addReview(review).subscribe((success) => {
            if (success) {
              this.submitted = true;
              this.error = false;
              this.reviewForm.reset();
              this.isReviewNew = false;

              if (!this.userLogged) return;

              const userReviews = this.userLogged.reviewIds || [];
              const reviewId = review.id;

              this.userLogged.reviewIds = [...userReviews, reviewId];
              console.log(this.userLogged.reviewIds);

              if (this.userLogged.id) {
                this.userService
                  .updateUser(this.userLogged, this.userLogged.id)
                  .subscribe(() => {
                    localStorage.setItem(
                      'user',
                      JSON.stringify(this.userLogged)
                    );
                  });
              }
            } else {
              this.error = true;
            }
          });

          console.log(review);
        });
    }
  }

  isNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = !isNaN(value) && value !== null && value !== '';
    return isValid ? null : { notNumber: true };
  }
}

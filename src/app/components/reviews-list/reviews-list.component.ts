import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Review } from '../../models/Review';
import { ReviewService } from '../../services/review/review.service';
import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reviews-list',
  standalone: false,
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss',
})
export class ReviewsListComponent implements OnInit {
  @Input() hasFilter?: boolean = false;
  @Input() bookId?: string = '';

  reviews: Review[] = [];
  usersMap = new Map<string, User>();

  constructor(
    private reviewService: ReviewService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
    this.reviewService.reviewAdded$.subscribe(() => {
      this.loadReviews();
    });
    this.reviewService.reviewRemoved$.subscribe(() => {
      this.loadReviews();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId'] && !changes['bookId'].firstChange) {
      this.loadReviews();
    }
  }

  private loadReviews(): void {
    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = !this.hasFilter
        ? data
        : data.filter((review) => review.bookId === this.bookId);

      const userIds = [...new Set(this.reviews.map((r) => r.userId))];

      this.usersMap.clear();
      userIds.forEach((userId) => {
        this.userService.getUser(userId).subscribe((user) => {
          this.usersMap.set(userId, user!);
        });
      });
    });
  }
}

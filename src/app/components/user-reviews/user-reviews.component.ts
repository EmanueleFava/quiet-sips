import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Review } from '../../models/Review';
import { ReviewService } from '../../services/review/review.service';

@Component({
  selector: 'app-user-reviews',
  standalone: false,
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.scss',
})
export class UserReviewsComponent implements OnInit {
  @Input() user: User | null = null;
  reviews: Review[] = [];
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    const reviewIds = this.user?.reviewIds?.filter((id) => id) || [];
    if (!reviewIds.length) return;

    this.reviewService.getReviews().subscribe((reviews) => {
      this.reviews = reviews.filter((review) =>
        reviewIds.includes(String(review.id))
      );
    });

    this.reviewService.reviewRemoved$.subscribe(() => {
      this.reviewService.getReviews().subscribe((reviews) => {
        this.reviews = reviews.filter((review) =>
          reviewIds.includes(String(review.id))
        );
      });
    });
  }
}

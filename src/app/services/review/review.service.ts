import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, tap, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../../models/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;
  private reviewAddedSource = new Subject<void>(); // Subject per notificare aggiunte
  reviewAdded$ = this.reviewAddedSource.asObservable(); // Observable da usare nei componenti
  private reviewRemovedSource = new Subject<void>();
  reviewRemoved$ = this.reviewRemovedSource.asObservable();

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getReview(reviewId: string): Observable<Review | undefined> {
    return this.getReviews().pipe(
      map((reviews) => reviews.find((review) => review.id === reviewId))
    );
  }

  getUserReviewForBook(
    userId: string,
    bookId: string
  ): Observable<Review | undefined> {
    return this.getReviews().pipe(
      map((reviews) =>
        reviews.find(
          (review) => review.userId === userId && review.bookId === bookId
        )
      )
    );
  }

  addReview(review: Review): Observable<Review> {
    return this.http
      .post<Review>(this.apiUrl, review)
      .pipe(tap(() => this.reviewAddedSource.next()));
  }

  updateReview(reviewId: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${reviewId}`, review);
  }

  deleteReview(reviewId: string, userId: string): Observable<Review> {
    return this.getReview(reviewId).pipe(
      tap((review) => {
        if (!review) {
          throw new Error('Recensione non trovata');
        }
        if (review.userId !== userId) {
          throw new Error(
            'Non puoi cancellare una recensione che non ti appartiene'
          );
        }
      }),
      switchMap(() =>
        this.http
          .delete<Review>(`${this.apiUrl}/${reviewId}`)
          .pipe(tap(() => this.reviewRemovedSource.next()))
      )
    );
  }
}

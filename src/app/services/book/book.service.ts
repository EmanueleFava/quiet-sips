import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../../models/Book';
import { Review } from '../../models/Review';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;
  private reviewsUrl = `${environment.apiUrl}/reviews`;
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      map((books) => {
        return this.http.get<Review[]>(this.reviewsUrl).pipe(
          map((reviews) => {
            return books.map((book) => {
              const bookReviews = reviews.filter(
                (review) => review.bookId === book.id
              );
              const averageRating = this.calculateAverageRating(bookReviews);
              return { ...book, averageRating };
            });
          })
        );
      }),
      // Flatten the nested Observable
      switchMap((booksWithReviews$) => booksWithReviews$)
    );
  }

  private calculateAverageRating(reviews: Review[]): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / reviews.length;
    // Arrotonda a 1 decimale
    return Math.round(average * 10) / 10;
  }

  getBook(bookId: string): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map((books) => books.find((book) => book.id === bookId))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(book: Book, bookId: string): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, book);
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/${bookId}`);
  }
}

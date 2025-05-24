import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Author } from '../../models/Author';
@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = `${environment.apiUrl}/authors`;
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthor(authorId: string): Observable<Author | undefined> {
    return this.getAuthors().pipe(
      map((authors) => authors.find((author) => author.id === authorId))
    );
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(authorId: string, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/${authorId}`, author);
  }

  deleteAuthor(authorId: string): Observable<Author> {
    return this.http.delete<Author>(`${this.apiUrl}/${authorId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private userUpdates = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(userId: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.id === userId))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user).pipe(
      map((updatedUser) => {
        this.userUpdates.next(updatedUser);
        return updatedUser;
      })
    );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }

  getUserUpdates(): Observable<User | null> {
    return this.userUpdates.asObservable();
  }
}

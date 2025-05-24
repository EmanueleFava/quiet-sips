import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { User } from '../../models/User';
import { BookService } from '../../services/book/book.service';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-books',
  standalone: false,
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.scss',
})
export class UserBooksComponent implements OnInit, OnDestroy {
  @Input() user: User | null = null;
  books: Book[] = [];
  private userUpdatesSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserBooks();

    this.userUpdatesSubscription = this.userService
      .getUserUpdates()
      .subscribe((updatedUser) => {
        if (updatedUser && this.user && updatedUser.id === this.user.id) {
          this.user = updatedUser;
          this.loadUserBooks();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userUpdatesSubscription) {
      this.userUpdatesSubscription.unsubscribe();
    }
  }

  private loadUserBooks(): void {
    const bookIds = this.user?.bookIds?.filter((id) => id) || [];
    if (!bookIds.length) {
      this.books = [];
      return;
    }

    this.bookService.getBooks().subscribe((books) => {
      this.books = books.filter((book) => bookIds.includes(String(book.id)));
    });
  }
}

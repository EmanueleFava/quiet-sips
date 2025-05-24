import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { Book } from '../../../models/Book';

@Component({
  selector: 'app-books-list',
  standalone: false,
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  @Input() hasFilter?: boolean = false;
  @Input() authorId?: string = '';
  @Input() isDashBoard?: boolean;

  books: Book[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    if (!this.hasFilter) {
      this.bookService.getBooks().subscribe((data) => {
        this.books = data;
      });
      if (this.isDashBoard) {
        this.bookService.getBooks().subscribe((data) => {
          this.books = data.splice(0, 6);
        });
      }
    } else {
      this.bookService.getBooks().subscribe((data) => {
        this.books = data.filter((book) => book.authorId == this.authorId);
      });
    }
  }
}

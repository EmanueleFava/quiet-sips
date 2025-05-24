import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/Book';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  book: Book | null = null;
  authorId: string = '';
  author: Author | null = null;
  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.book = this.books[Math.floor(Math.random() * this.books.length)];
      this.authorId = this.book!.authorId;
      this.authorService.getAuthor(this.authorId).subscribe((data) => {
        this.author = data!;
        console.log(this.author);
      });
    });
  }
}

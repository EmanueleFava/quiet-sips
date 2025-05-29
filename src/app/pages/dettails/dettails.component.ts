import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book/book.service';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/Author';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dettails',
  standalone: false,
  templateUrl: './dettails.component.html',
  styleUrls: ['./dettails.component.scss'],
})
export class DettailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    @Inject(AuthService) private auth: AuthService
  ) {
    console.log('bookService nel costruttore:', bookService);
  }

  id: string | null = null;
  book: Book | null = null;
  author: Author | null = null;
  books: Book[] = [];
  authorId: string = '';

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        console.log('id ricevuto:', this.id);
        this.bookService.getBook(this.id).subscribe((data) => {
          if (data) {
            this.book = data;
            console.log(this.book);
            this.authorId = this.book.authorId || '';
            console.log(this.authorId);
            this.authorService
              .getAuthor(this.authorId)
              .subscribe((authorData) => {
                this.author = authorData!;
                console.log(this.author);
              });
          } else {
            this.book = null;
            this.author = null;
            this.authorId = '';
            console.warn('Libro non trovato');
          }
        });
      }
    });
  }
}

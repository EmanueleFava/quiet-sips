import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Book } from '../../../models/Book';
import { AuthorService } from '../../../services/author/author.service';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() book!: Book;
  authorName: string | undefined = '';
  userLogged: User | null = null;
  hasBook: boolean = false;
  bookId: string | null = '';

  constructor(
    private authorService: AuthorService,
    @Inject(AuthService) private auth: AuthService,
    @Inject(UserService) private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  onAddBookClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.isLoggedIn) {
      console.warn('User not logged in');
      return;
    }

    this.userLogged = this.auth.getUser();

    if (!this.userLogged) {
      console.error('User non loggato');
      return;
    }

    if (!this.bookId) {
      console.error('Id non disponibile');
      return;
    }

    const userBooks = this.userLogged.bookIds || [];

    this.hasBook = userBooks.includes(this.bookId);

    this.userLogged.bookIds = [...userBooks, this.bookId];
    this.hasBook = true;
    if (this.userLogged.id) {
      this.userService
        .updateUser(this.userLogged, this.userLogged.id)
        .subscribe((data) => console.log(data));
      localStorage.setItem('user', JSON.stringify(this.userLogged));

      console.log('Libro aggiunto con successo: ', this.userLogged.bookIds);
    }
  }

  onRemoveBookClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.isLoggedIn || !this.userLogged || !this.bookId) {
      return;
    }

    const updatedBookIds =
      this.userLogged.bookIds?.filter((id) => id !== this.bookId) || [];
    this.userLogged.bookIds = updatedBookIds;

    if (this.userLogged.id) {
      this.userService
        .updateUser(this.userLogged, this.userLogged.id)
        .subscribe({
          next: () => {
            this.hasBook = false;
            localStorage.setItem('user', JSON.stringify(this.userLogged));
          },
          error: (err) =>
            console.error(
              'Errore durante il tentativo di rimozione libro:',
              err
            ),
        });
    }
  }

  ngOnInit(): void {
    const authorId = this.book.authorId;
    this.bookId = this.book.id!;

    if (this.isLoggedIn) {
      this.userLogged = this.auth.getUser();
      if (this.userLogged && this.userLogged.bookIds) {
        this.hasBook = this.userLogged.bookIds.includes(this.bookId);
      }
    }

    this.authorService.getAuthor(authorId).subscribe((data) => {
      this.authorName = data?.name;
    });
  }
}

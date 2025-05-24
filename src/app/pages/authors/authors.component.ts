import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/Author';
import { BookService } from '../../services/book/book.service';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-authors',
  standalone: false,
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
})
export class AuthorsComponent implements OnInit {
  author: Author | null = null;
  constructor(private authorService: AuthorService) {}
  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      this.author = data[Math.floor(Math.random() * data.length)];
    });
  }
}

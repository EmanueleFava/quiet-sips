import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/Author';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-authors-list',
  standalone: false,
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss',
})
export class AuthorsListComponent implements OnInit {
  authors: Author[] = [];
  constructor(private authService: AuthorService) {}

  ngOnInit(): void {
    this.authService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }
}

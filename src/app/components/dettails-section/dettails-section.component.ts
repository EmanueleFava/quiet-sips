import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-dettails-section',
  standalone: false,
  templateUrl: './dettails-section.component.html',
  styleUrl: './dettails-section.component.scss',
})
export class DettailsSectionComponent {
  @Input() book: Book | null = null;
  @Input() author: Author | null = null;
}

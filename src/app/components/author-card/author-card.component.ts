import { Component, Input } from '@angular/core';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-author-card',
  standalone: false,
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.scss',
})
export class AuthorCardComponent {
  @Input() author?: Author;
}

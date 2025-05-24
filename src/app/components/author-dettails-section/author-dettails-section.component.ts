import { Component, Input } from '@angular/core';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-author-dettails-section',
  standalone: false,
  templateUrl: './author-dettails-section.component.html',
  styleUrl: './author-dettails-section.component.scss',
})
export class AuthorDettailsSectionComponent {
  @Input() author: Author | null = null;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-container',
  standalone: false,
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.scss',
})
export class BookContainerComponent {
  @Input() isDashBoard?: boolean;
}

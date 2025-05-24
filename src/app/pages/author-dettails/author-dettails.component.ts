import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author/author.service';
import { Author } from '../../models/Author';

@Component({
  selector: 'app-author-dettails',
  standalone: false,
  templateUrl: './author-dettails.component.html',
  styleUrl: './author-dettails.component.scss',
})
export class AuthorDettailsComponent implements OnInit {
  id: string | null = null;
  author: Author | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        console.log('id ricevuto:', this.id);
        this.authService.getAuthor(this.id).subscribe((data) => {
          this.author = data!;
          console.log(this.author);
        });
      }
    });
  }
}

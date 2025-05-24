import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTestComponent } from './components/user-test/user-test.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { NavigationComponent } from './components/navbar/navigation/navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login/login.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { LoginFormComponent } from './components/login-form/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form/signup-form.component';
import { HeroComponent } from './components/hero/hero/hero.component';
import { BooksListComponent } from './components/books-list/books-list/books-list.component';
import { CardComponent } from './components/card/card/card.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { BookContainerComponent } from './components/book-container/book-container.component';
import { DettailsComponent } from './pages/dettails/dettails.component';
import { DettailsSectionComponent } from './components/dettails-section/dettails-section.component';
import { AuthorDettailsSectionComponent } from './components/author-dettails-section/author-dettails-section.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { CardReviewComponent } from './components/card-review/card-review.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorDettailsComponent } from './pages/author-dettails/author-dettails.component';
import { ReviewTextareaComponent } from './components/review-textarea/review-textarea.component';
import { AvatarProfileComponent } from './components/avatar-profile/avatar-profile.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTestComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent,
    HeroComponent,
    BooksListComponent,
    CardComponent,
    FooterComponent,
    BookContainerComponent,
    DettailsComponent,
    DettailsSectionComponent,
    AuthorDettailsSectionComponent,
    ReviewsListComponent,
    CardReviewComponent,
    BooksComponent,
    AuthorsComponent,
    AuthorsListComponent,
    AuthorCardComponent,
    AuthorDettailsComponent,
    ReviewTextareaComponent,
    AvatarProfileComponent,
    UserBooksComponent,
    UserReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

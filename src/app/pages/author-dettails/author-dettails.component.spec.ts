import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDettailsComponent } from './author-dettails.component';

describe('AuthorDettailsComponent', () => {
  let component: AuthorDettailsComponent;
  let fixture: ComponentFixture<AuthorDettailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDettailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDettailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

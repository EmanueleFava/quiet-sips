import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDettailsSectionComponent } from './author-dettails-section.component';

describe('AuthorDettailsSectionComponent', () => {
  let component: AuthorDettailsSectionComponent;
  let fixture: ComponentFixture<AuthorDettailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDettailsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDettailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

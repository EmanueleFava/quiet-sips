import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTextareaComponent } from './review-textarea.component';

describe('ReviewTextareaComponent', () => {
  let component: ReviewTextareaComponent;
  let fixture: ComponentFixture<ReviewTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

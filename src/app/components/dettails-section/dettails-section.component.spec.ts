import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettailsSectionComponent } from './dettails-section.component';

describe('DettailsSectionComponent', () => {
  let component: DettailsSectionComponent;
  let fixture: ComponentFixture<DettailsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettailsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

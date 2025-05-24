import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettailsComponent } from './dettails.component';

describe('DettailsComponent', () => {
  let component: DettailsComponent;
  let fixture: ComponentFixture<DettailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DettailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

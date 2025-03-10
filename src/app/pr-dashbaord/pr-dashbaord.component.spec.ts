import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrDashbaordComponent } from './pr-dashbaord.component';

describe('PrDashbaordComponent', () => {
  let component: PrDashbaordComponent;
  let fixture: ComponentFixture<PrDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrDashbaordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

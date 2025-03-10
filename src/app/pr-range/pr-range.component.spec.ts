import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrRangeComponent } from './pr-range.component';

describe('PrRangeComponent', () => {
  let component: PrRangeComponent;
  let fixture: ComponentFixture<PrRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

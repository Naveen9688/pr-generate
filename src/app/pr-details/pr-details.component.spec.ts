import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrDetailsComponent } from './pr-details.component';

describe('PrDetailsComponent', () => {
  let component: PrDetailsComponent;
  let fixture: ComponentFixture<PrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

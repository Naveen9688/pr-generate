import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalprsComponent } from './totalprs.component';

describe('TotalprsComponent', () => {
  let component: TotalprsComponent;
  let fixture: ComponentFixture<TotalprsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalprsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalprsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

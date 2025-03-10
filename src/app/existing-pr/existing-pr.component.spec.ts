import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPrComponent } from './existing-pr.component';

describe('ExistingPrComponent', () => {
  let component: ExistingPrComponent;
  let fixture: ComponentFixture<ExistingPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingPrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

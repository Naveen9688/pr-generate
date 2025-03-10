import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrZoneDashboardComponent } from './pr-zone-dashboard.component';

describe('PrZoneDashboardComponent', () => {
  let component: PrZoneDashboardComponent;
  let fixture: ComponentFixture<PrZoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrZoneDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrZoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

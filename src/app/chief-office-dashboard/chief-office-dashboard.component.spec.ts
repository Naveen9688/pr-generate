import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefOfficeDashboardComponent } from './chief-office-dashboard.component';

describe('ChiefOfficeDashboardComponent', () => {
  let component: ChiefOfficeDashboardComponent;
  let fixture: ComponentFixture<ChiefOfficeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefOfficeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiefOfficeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

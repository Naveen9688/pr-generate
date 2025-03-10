import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeEntryComponent } from './one-time-entry.component';

describe('OneTimeEntryComponent', () => {
  let component: OneTimeEntryComponent;
  let fixture: ComponentFixture<OneTimeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneTimeEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

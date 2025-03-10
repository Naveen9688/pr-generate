import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorViewDialogComponent } from './major-view-dialog.component';

describe('MajorViewDialogComponent', () => {
  let component: MajorViewDialogComponent;
  let fixture: ComponentFixture<MajorViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

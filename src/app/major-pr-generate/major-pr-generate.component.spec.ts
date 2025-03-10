import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorPrGenerateComponent } from './major-pr-generate.component';

describe('MajorPrGenerateComponent', () => {
  let component: MajorPrGenerateComponent;
  let fixture: ComponentFixture<MajorPrGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorPrGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorPrGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

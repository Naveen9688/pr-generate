import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorPrTabledataComponent } from './major-pr-tabledata.component';

describe('MajorPrTabledataComponent', () => {
  let component: MajorPrTabledataComponent;
  let fixture: ComponentFixture<MajorPrTabledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorPrTabledataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorPrTabledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

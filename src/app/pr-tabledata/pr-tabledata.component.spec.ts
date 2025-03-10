import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTabledataComponent } from './pr-tabledata.component';

describe('PrTabledataComponent', () => {
  let component: PrTabledataComponent;
  let fixture: ComponentFixture<PrTabledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrTabledataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrTabledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

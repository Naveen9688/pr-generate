import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrGeneratoComponent } from './new-pr-generato.component';

describe('NewPrGeneratoComponent', () => {
  let component: NewPrGeneratoComponent;
  let fixture: ComponentFixture<NewPrGeneratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPrGeneratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPrGeneratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

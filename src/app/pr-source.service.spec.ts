import { TestBed } from '@angular/core/testing';

import { PrSourceService } from './pr-source.service';

describe('PrSourceService', () => {
  let service: PrSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

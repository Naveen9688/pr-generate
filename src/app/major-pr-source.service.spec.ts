import { TestBed } from '@angular/core/testing';

import { MajorPrSourceService } from './major-pr-source.service';

describe('MajorPrSourceService', () => {
  let service: MajorPrSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajorPrSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

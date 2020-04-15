import { TestBed } from '@angular/core/testing';

import { GlucoseService } from './glucose.service';

describe('GlucoseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlucoseService = TestBed.get(GlucoseService);
    expect(service).toBeTruthy();
  });
});

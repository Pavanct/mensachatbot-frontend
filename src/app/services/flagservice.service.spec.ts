import { TestBed } from '@angular/core/testing';

import { FlagService } from './flagservice.service';

describe('FlagserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlagService = TestBed.get(FlagService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MensabotService } from './mensabot.service';

describe('MensabotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensabotService = TestBed.get(MensabotService);
    expect(service).toBeTruthy();
  });
});

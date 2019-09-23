import { TestBed } from '@angular/core/testing';

import { TeamRandomizerService } from './team-randomizer.service';

describe('TeamRandomizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamRandomizerService = TestBed.get(TeamRandomizerService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WinnerCalculatorService } from './winner-calculator.service';

describe('WinnerCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WinnerCalculatorService = TestBed.get(WinnerCalculatorService);
    expect(service).toBeTruthy();
  });
});

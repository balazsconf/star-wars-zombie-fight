import { async, TestBed } from '@angular/core/testing';
import { FightScreenModule } from './fight-screen.module';

describe('FightScreenModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FightScreenModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FightScreenModule).toBeDefined();
  });
});

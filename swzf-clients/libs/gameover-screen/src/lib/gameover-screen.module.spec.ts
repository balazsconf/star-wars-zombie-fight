import { async, TestBed } from '@angular/core/testing';
import { GameoverScreenModule } from './gameover-screen.module';

describe('GameoverScreenModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GameoverScreenModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GameoverScreenModule).toBeDefined();
  });
});

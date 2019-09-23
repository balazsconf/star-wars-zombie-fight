import { async, TestBed } from '@angular/core/testing';
import { IntroScreenModule } from './intro-screen.module';

describe('IntroScreenModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IntroScreenModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IntroScreenModule).toBeDefined();
  });
});

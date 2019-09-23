import { async, TestBed } from '@angular/core/testing';
import { SwzfUiModule } from './swzf-ui.module';

describe('SwzfUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SwzfUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SwzfUiModule).toBeDefined();
  });
});

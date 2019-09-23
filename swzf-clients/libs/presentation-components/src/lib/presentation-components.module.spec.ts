import { async, TestBed } from '@angular/core/testing';
import { PresentationComponentsModule } from './presentation-components.module';

describe('PresentationComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PresentationComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PresentationComponentsModule).toBeDefined();
  });
});

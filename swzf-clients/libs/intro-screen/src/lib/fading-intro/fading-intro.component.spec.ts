import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadingIntroComponent } from './fading-intro.component';

describe('FadingIntroComponent', () => {
  let component: FadingIntroComponent;
  let fixture: ComponentFixture<FadingIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadingIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadingIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWinnerComponent } from './display-winner.component';

xdescribe('DisplayWinnerComponent', () => {
  let component: DisplayWinnerComponent;
  let fixture: ComponentFixture<DisplayWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

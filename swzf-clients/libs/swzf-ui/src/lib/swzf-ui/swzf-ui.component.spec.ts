import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwzfUiComponent } from './swzf-ui.component';

describe('SwzfUiComponent', () => {
  let component: SwzfUiComponent;
  let fixture: ComponentFixture<SwzfUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwzfUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwzfUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

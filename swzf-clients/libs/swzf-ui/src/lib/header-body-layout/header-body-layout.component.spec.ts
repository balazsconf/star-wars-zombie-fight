import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBodyLayoutComponent } from './header-body-layout.component';

describe('HeaderBodyLayoutComponent', () => {
  let component: HeaderBodyLayoutComponent;
  let fixture: ComponentFixture<HeaderBodyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBodyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBodyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Day25Component } from './day25.component';

describe('Day25Component', () => {
  let component: Day25Component;
  let fixture: ComponentFixture<Day25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Day25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfailComponent } from './loginfail.component';

describe('LoginfailComponent', () => {
  let component: LoginfailComponent;
  let fixture: ComponentFixture<LoginfailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

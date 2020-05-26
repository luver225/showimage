import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistorComponent } from './vistor.component';

describe('VistorComponent', () => {
  let component: VistorComponent;
  let fixture: ComponentFixture<VistorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

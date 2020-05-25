import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThememanagerComponent } from './thememanager.component';

describe('ThememanagerComponent', () => {
  let component: ThememanagerComponent;
  let fixture: ComponentFixture<ThememanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThememanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThememanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

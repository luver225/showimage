import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotomanagementComponent } from './photomanagement.component';

describe('PhotomanagementComponent', () => {
  let component: PhotomanagementComponent;
  let fixture: ComponentFixture<PhotomanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotomanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotomanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

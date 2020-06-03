import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageinfoComponent } from './imageinfo.component';

describe('ImageinfoComponent', () => {
  let component: ImageinfoComponent;
  let fixture: ComponentFixture<ImageinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

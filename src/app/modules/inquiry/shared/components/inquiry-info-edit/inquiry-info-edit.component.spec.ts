import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInfoEditComponent } from './inquiry-info-edit.component';

describe('InquiryInfoEditComponent', () => {
  let component: InquiryInfoEditComponent;
  let fixture: ComponentFixture<InquiryInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

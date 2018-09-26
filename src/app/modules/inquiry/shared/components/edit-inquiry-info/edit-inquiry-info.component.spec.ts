import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInquiryInfoComponent } from './edit-inquiry-info.component';

describe('EditInquiryInfoComponent', () => {
  let component: EditInquiryInfoComponent;
  let fixture: ComponentFixture<EditInquiryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInquiryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInquiryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

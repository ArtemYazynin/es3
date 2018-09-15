import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryEditCommonComponent } from './inquiry-edit-common.component';

describe('InquiryEditCommonComponent', () => {
  let component: InquiryEditCommonComponent;
  let fixture: ComponentFixture<InquiryEditCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryEditCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryEditCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

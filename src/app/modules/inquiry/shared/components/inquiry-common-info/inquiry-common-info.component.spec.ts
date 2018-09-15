import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryCommonInfoComponent } from './inquiry-common-info.component';

describe('InquiryCommonInfoComponent', () => {
  let component: InquiryCommonInfoComponent;
  let fixture: ComponentFixture<InquiryCommonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryCommonInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryCommonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryReadComponent } from './inquiry-read.component';

describe('InquiryReadComponent', () => {
  let component: InquiryReadComponent;
  let fixture: ComponentFixture<InquiryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

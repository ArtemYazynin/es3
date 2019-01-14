import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryViewComponent } from './inquiry-view.component';

describe('InquiryViewComponent', () => {
  let component: InquiryViewComponent;
  let fixture: ComponentFixture<InquiryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

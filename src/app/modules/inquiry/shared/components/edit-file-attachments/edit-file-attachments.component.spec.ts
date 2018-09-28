import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileAttachmentsComponent } from './edit-file-attachments.component';

describe('EditFileAttachmentsComponent', () => {
  let component: EditFileAttachmentsComponent;
  let fixture: ComponentFixture<EditFileAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFileAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFileAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

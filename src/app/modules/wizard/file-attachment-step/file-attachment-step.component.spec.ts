import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentStepComponent } from './file-attachment-step.component';

describe('FileAttachmentStepComponent', () => {
  let component: FileAttachmentStepComponent;
  let fixture: ComponentFixture<FileAttachmentStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAttachmentStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

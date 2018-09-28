import { ChangeDetectionStrategy, Component, OnInit, ViewChild, DoCheck, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Inquiry, inquiryType } from '../../../shared';
import { EditFileAttachmentsComponent } from '../../inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { StepBase, WizardStorageService } from '../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileAttachmentStepComponent implements OnInit, StepBase {
  @ViewChild(EditFileAttachmentsComponent) editFileAttachmentsComponent: EditFileAttachmentsComponent
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    
  }

  isValid() {
    return this.editFileAttachmentsComponent.isValid();
  }

  goTo = {
    back: () => {
      switch (this.inquiryType) {
        case inquiryType.preschool:
          this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.route });
          break;
        case inquiryType.school:
          this.router.navigate(["../schoolInstitutionStep"], { relativeTo: this.route });
          break;
        case inquiryType.healthCamp:
          this.router.navigate(["../healthCampStep"], { relativeTo: this.route });
          break;
        default:
          break;
      }
    },
    next: () => {
      const data = this.editFileAttachmentsComponent.bunchOfFileView
        .filter(x => x.fileAttachment.file != null)
        .map(fileView => {
          let data = Object.assign({}, fileView.fileAttachment.file, { name: fileView.fileAttachment.file.name });
          if (isNullOrUndefined(fileView.fileAttachment.description) || fileView.fileAttachment.description == "") return data;
          Object.assign(data, { description: fileView.fileAttachment.description })
          return data;
        });
      this.storageService.set(this.inquiryType, {
        filesInfo: {
          files: data,
          haveDigitalSignature: this.editFileAttachmentsComponent.haveDigitalSignature
        }
      });
      this.router.navigate(["../previewStep"], { relativeTo: this.route });
    }
  };
}


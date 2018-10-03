import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquiry, InquiryService, inquiryType } from '../../../shared';
import { EditFileAttachmentsComponent } from '../../inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { StepBase, WizardStorageService } from '../shared';

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

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private cdr: ChangeDetectorRef, private inquiryService: InquiryService) { }

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
      this.inquiryService.saveFileAttachments(this.editFileAttachmentsComponent, (patch) => {
        this.storageService.set(this.inquiryType, patch);
      });
      this.router.navigate(["../previewStep"], { relativeTo: this.route });
    }
  };
}


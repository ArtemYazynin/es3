import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditFileAttachmentsComponent } from '../../inquiry/shared/components/edit-file-attachments/edit-file-attachments.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileAttachmentStepComponent implements OnInit {
  @ViewChild(EditFileAttachmentsComponent) editFileAttachmentsComponent: EditFileAttachmentsComponent
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        let filesInfo = this.editFileAttachmentsComponent.getResult();
        this.storageService.set(this.inquiry.type, filesInfo);
        this.router.navigate(["../previewStep"], { relativeTo: this.route });
      },
      this.actionsButtonsService.inverseActionFileAttachmentStep(this.inquiry.type, this.router, this.route)
    );
  }

  isValid() {
    return this.editFileAttachmentsComponent && this.editFileAttachmentsComponent.isValid()
  }
}
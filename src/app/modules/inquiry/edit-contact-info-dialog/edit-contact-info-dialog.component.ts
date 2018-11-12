import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest, InquiryService } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { WizardStorageService } from '../../wizard/shared';
import { EditContactInfoComponent } from '../shared/components/edit-contact-info/edit-contact-info.component';

@Component({
  selector: 'app-edit-contact-info-dialog',
  templateUrl: './edit-contact-info-dialog.component.html',
  styleUrls: ['./edit-contact-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactInfoDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  inquiry: InquiryRequest;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditContactInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<InquiryRequest> },
    private storageService: WizardStorageService,
    private inquiryService: InquiryService, private cdr: ChangeDetectorRef,
    private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        this.inquiryService.saveContactInfo(this.editContactInfoComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);
          Object.assign(this.inquiry, patch);
          this.data.$inquiry.next(this.inquiry);
        })
        this.dialogRef.close();
      }
    );
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.config.primaryAction = this.actionsButtonsService.primaryActionContactInfoDialog(this.editContactInfoComponent, this.inquiry, this.data, this.dialogRef);

  }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons } from '../../../shared';
import { ContactInfo } from '../../wizard/shared';
import { EditContactInfoComponent } from '../shared/components/edit-contact-info/edit-contact-info.component';

@Component({
  selector: 'app-edit-contact-info-dialog',
  templateUrl: './edit-contact-info-dialog.component.html',
  styleUrls: ['./edit-contact-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactInfoDialogComponent implements OnInit {
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditContactInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $contactInfo: BehaviorSubject<ContactInfo> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        let contactInfo = this.editContactInfoComponent.getResult();
        this.data.$contactInfo.next(contactInfo);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      }
    );
  }

  isValid() {
    return this.editContactInfoComponent && this.editContactInfoComponent.isValid()
  }
}

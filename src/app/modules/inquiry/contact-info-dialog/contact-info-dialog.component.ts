import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, Theme } from '../../../shared';
import { ContactInfo } from '../../wizard/shared';
import { EditContactInfoComponent } from '../shared/components/edit-contact-info/edit-contact-info.component';

@Component({
  selector: 'app-contact-info-dialog',
  templateUrl: './contact-info-dialog.component.html',
  styleUrls: ['./contact-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoDialogComponent implements OnInit {
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<ContactInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $contactInfo: BehaviorSubject<ContactInfo> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
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

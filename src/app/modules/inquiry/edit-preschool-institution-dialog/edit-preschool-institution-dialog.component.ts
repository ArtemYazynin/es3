import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, Institution, SchoolClass, Theme } from '../../../shared';
import { EditInstitutionsComponent } from '../shared/components/edit-institutions/edit-institutions.component';

@Component({
  selector: 'app-edit-preschool-institution-dialog',
  templateUrl: './edit-preschool-institution-dialog.component.html',
  styleUrls: ['./edit-preschool-institution-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPreschoolInstitutionDialogComponent implements OnInit {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  constructor(public dialogRef: MatDialogRef<EditPreschoolInstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $configSubject: BehaviorSubject<{ institutions: Array<Institution> | Array<SchoolClass>, IsLearnEducCenter: boolean }>, inquiryType: string }) { }

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let institutions = this.editInstitutionsComponent.selectedInstitutions;
        if (this.data.inquiryType == "school") {
          let IsLearnEducCenter = this.editInstitutionsComponent.form.controls.IsLearnEducCenter.value;
          this.data.$configSubject.next({ institutions: institutions, IsLearnEducCenter: IsLearnEducCenter });
        } else {
          this.data.$configSubject.next({ institutions: institutions, IsLearnEducCenter: undefined });
        }
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }

  isValid() {
    return this.editInstitutionsComponent && this.editInstitutionsComponent.isValid()
  }
}
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, ApplicantType, CommonService } from '../../../shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType },
    private commonService:CommonService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  save() {
    // const inquiry = this.prepare();
    // this.$inquiry.next(inquiry);
    // this.storageService.set(inquiry["_type"], { privilege: inquiry.privilege })

    switch (this.data.modelType) {
      case ApplicantType.Parent:
      //let parent = this.commonService.buildParent(this.editPersonComponent, this.inquiry.applicantType);
        break;
      case ApplicantType.Applicant:
        
        break;
      default:
        break;
    }
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    if(!this.editPersonComponent) return false;
    let result = this.editPersonComponent.isValid()
    console.log(`result: ${result}`)
    return result;
  }
}

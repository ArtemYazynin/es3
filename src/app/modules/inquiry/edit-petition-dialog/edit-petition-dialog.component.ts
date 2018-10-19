import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { InquiryService, Petition, FamilyInfo } from '../../../shared';
import { PetitionType } from '../../../shared/petition-type.enum';
import { WizardStorageService } from '../../wizard/shared';
import { FamilyInfoService } from '../../../shared/family-info.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-petition-dialog',
  templateUrl: './edit-petition-dialog.component.html',
  styleUrls: ['./edit-petition-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionDialogComponent implements OnInit {
  petitionType: PetitionType = PetitionType.Individual;
  types: Array<PetitionType> = [];
  petitionTypes = PetitionType;
  petition: Petition;
  bunchOfFamilyInfo: Array<FamilyInfo> = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(public dialogRef: MatDialogRef<EditPetitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $petition: BehaviorSubject<Petition> },
    private storageService: WizardStorageService, private inquiryService: InquiryService, private familyInfoService: FamilyInfoService) { }

  ngOnInit() {
    this.familyInfoService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.bunchOfFamilyInfo = data;
      });
    this.petition = this.data.$petition.getValue();
    this.types.push(PetitionType.Individual);
    this.types.push(PetitionType.Organization);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid() {

  }
  save() {

    //this.data.$petition.next();
  }
}

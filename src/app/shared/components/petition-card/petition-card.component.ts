import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Petition } from '../../models/petition.model';
import { CommonService } from '../../common.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditPetitionDialogComponent } from '../../../modules/inquiry/edit-petition-dialog/edit-petition-dialog.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-petition-card',
  templateUrl: './petition-card.component.html',
  styleUrls: ['./petition-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetitionCardComponent implements OnInit, OnDestroy {
  @Input() model: Petition;

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private commonService: CommonService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let data = { $petition: new BehaviorSubject<Petition>(this.model) };
    data.$petition
      .pipe(skip(1))
      .subscribe(petition => {
        let s = this;
      })

    let config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = false;
    config.data = data;
    config.width = "1000px";
    this.dialog.open(EditPetitionDialogComponent, config);
  }
}

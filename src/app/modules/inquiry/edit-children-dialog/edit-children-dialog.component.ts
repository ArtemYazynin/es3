import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditChildrenComponent } from '../shared/components/edit-children/edit-children.component';

@Component({
    selector: 'app-edit-children-dialog',
    templateUrl: './edit-children-dialog.component.html',
    styleUrls: ['./edit-children-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditChildrenDialogComponent implements OnInit, AfterViewInit {

    @ViewChild(EditChildrenComponent) editChildrenComponent: EditChildrenComponent;

    inquiry: Inquiry;
    inquiryType: any;
    config: ConfigsOfRoutingButtons;

    constructor(public dialogRef: MatDialogRef<EditChildrenComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> }, private cdr: ChangeDetectorRef,
        private actionsButtonsService: ActionsButtonsService) { }

    ngOnInit() {
        this.inquiry = this.data.$inquiry.getValue();
        this.inquiryType = this.inquiry.type;
        this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
        this.config.primaryAction = this.actionsButtonsService.primaryActionChildrenDialog(this.editChildrenComponent, this.inquiry, this.data, this.dialogRef);
    }
}
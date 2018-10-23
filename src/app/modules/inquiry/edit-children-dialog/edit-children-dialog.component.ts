import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditChildrenComponent } from '../shared/components/edit-children/edit-children.component';

@Component({
    selector: 'app-edit-children-dialog',
    templateUrl: './edit-children-dialog.component.html',
    styleUrls: ['./edit-children-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditChildrenDialogComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
    @ViewChild(EditChildrenComponent) editChildrenComponent: EditChildrenComponent;

    inquiry: Inquiry;
    inquiryType: any;
    configs: ConfigsOfRoutingButtons;

    constructor(public dialogRef: MatDialogRef<EditChildrenComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> }, private storageService: WizardStorageService,
        private inquiryService: InquiryService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.inquiry = this.data.$inquiry.getValue();
        this.inquiryType = this.inquiry.type;
        this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
            () => {
                this.inquiryService.saveChildren(this.editChildrenComponent, (patch) => {
                    this.storageService.set(this.inquiry.type, patch);
                    Object.assign(this.inquiry, patch);
                    this.data.$inquiry.next(this.inquiry);
                })
                this.dialogRef.close();
            }
        );
    }
}
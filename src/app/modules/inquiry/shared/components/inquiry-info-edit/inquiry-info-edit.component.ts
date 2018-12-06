import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Theme } from '../../../../../shared';

@Component({
  selector: 'app-inquiry-info-edit',
  templateUrl: './inquiry-info-edit.component.html',
  styleUrls: ['./inquiry-info-edit.component.css'],
  host:{ 'class': 'inquiry-info-edit-host'},
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InquiryInfoEditComponent implements OnInit, AfterContentInit {
  @Input() title:string;
  @Input() theme:Theme;
  @Output() edit = new EventEmitter<void>();
  showEdit:boolean = false;
  themes = Theme;

  onEdit(){
    this.edit.emit();
  }
  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.showEdit = this.edit.observers.length > 0;
  }
  ngAfterContentInit(): void {
    this.cdr.markForCheck();
  }
}

import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Theme } from '../../../../../shared';
import { isNullOrUndefined } from 'util';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-inquiry-info-edit',
  templateUrl: './inquiry-info-edit.component.html',
  styleUrls: ['./inquiry-info-edit.component.css'],
  host:{ 'class': 'host'},
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
  constructor(private cdr:ChangeDetectorRef, private _sanitizer: DomSanitizer) { 
  }

  ngOnInit() {
    this.showEdit = this.edit.observers.length > 0;   
  }
  ngAfterContentInit(): void {
    this.cdr.markForCheck();
  }

  getUnderlineStyle(){
    if(isNullOrUndefined(this.theme)) return "";
    
    switch (this.theme) {
      case Theme.Gray:
        return {'border-bottom': '1px solid #ccc'}
      case Theme.Green:
        return {'border-bottom': '1px solid #58a068'};
      default:
        break;
    }
  }
}

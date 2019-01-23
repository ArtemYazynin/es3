import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Theme } from '../../../../../shared';

@Component({
  selector: 'app-inquiry-info-edit',
  templateUrl: './inquiry-info-edit.component.html',
  styleUrls: ['./inquiry-info-edit.component.css'],
  host: { 'class': 'host' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryInfoEditComponent implements OnInit, AfterContentInit {
  @Input() title: string;
  @Input() theme: Theme;
  @Output() edit = new EventEmitter<void>();
  showEdit: boolean = false;
  themes = Theme;
  grayStyle = { 'border-bottom': '1px solid #ccc' };
  greenStyle = { 'border-bottom': '1px solid #58a068' };
  onEdit() {
    this.edit.emit();
  }
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.showEdit = this.edit.observers.length > 0;
  }
  ngAfterContentInit(): void {
    this.cdr.markForCheck();
  }

  getUnderlineStyle() {
    if (isNullOrUndefined(this.theme)) return "";

    switch (this.theme) {
      case Theme.Gray:
        return this.grayStyle;
      case Theme.Green:
        return this.greenStyle;
      default:
        break;
    }
  }
}

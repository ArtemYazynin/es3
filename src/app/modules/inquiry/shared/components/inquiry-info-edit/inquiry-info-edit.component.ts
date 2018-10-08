import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inquiry-info-edit',
  templateUrl: './inquiry-info-edit.component.html',
  styleUrls: ['./inquiry-info-edit.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InquiryInfoEditComponent implements OnInit {
  @Input() title:string
  @Output() edit = new EventEmitter<void>();
  showEdit:boolean = false;

  onEdit(){
    this.edit.emit();
  }
  constructor() { }

  ngOnInit() {
    this.showEdit = this.edit.observers.length > 0;
  }

}

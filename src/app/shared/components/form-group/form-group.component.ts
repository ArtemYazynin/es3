import { Component, OnInit, ChangeDetectionStrategy, Input, Directive, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  host:{ 'class': 'form-group-host'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupComponent implements OnInit {
  @Input() label: string;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}

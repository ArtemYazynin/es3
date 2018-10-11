import { Component, Input, OnInit } from '@angular/core';
import { FilesInfo } from '../..';

@Component({
  selector: 'app-files-card',
  templateUrl: './files-card.component.html',
  styleUrls: ['./files-card.component.css']
})
export class FilesCardComponent implements OnInit {
  @Input() edit: () => void;
  @Input() filesInfo: FilesInfo;

  constructor() { }

  ngOnInit() {
  }

}

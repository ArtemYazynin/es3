import { Component, Input, OnInit } from '@angular/core';
import { FilesInfo } from '../../../shared';

@Component({
  selector: 'app-preview-files',
  templateUrl: './preview-files.component.html',
  styleUrls: ['./preview-files.component.css']
})
export class PreviewFilesComponent implements OnInit {
  @Input() filesInfo: FilesInfo;

  constructor() { }

  ngOnInit() {
  }
}

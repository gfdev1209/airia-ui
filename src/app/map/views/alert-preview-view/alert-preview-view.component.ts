import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-preview-view',
  templateUrl: './alert-preview-view.component.html',
  styleUrls: ['./alert-preview-view.component.scss'],
})
export class AlertPreviewViewComponent implements OnInit {
  @Input() alert?: Alert;

  constructor() {}

  ngOnInit() {}
}

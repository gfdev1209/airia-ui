import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../models';

@Component({
  selector: 'app-alert-preview',
  templateUrl: './alert-preview.component.html',
  styleUrls: ['./alert-preview.component.scss'],
})
export class AlertPreviewComponent implements OnInit {
  @Input() alert?: Alert;

  constructor() {}

  ngOnInit() {}
}

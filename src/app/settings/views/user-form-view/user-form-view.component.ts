import { Component, Input, OnInit } from '@angular/core';
import { User } from '@map/models';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.scss'],
})
export class UserFormViewComponent implements OnInit {
  @Input() user?: User | null;

  constructor() {}

  ngOnInit(): void {}
}

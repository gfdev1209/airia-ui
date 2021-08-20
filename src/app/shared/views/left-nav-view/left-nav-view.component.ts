import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from '@map/models';

@Component({
  selector: 'app-left-nav-view',
  templateUrl: './left-nav-view.component.html',
  styleUrls: ['./left-nav-view.component.scss'],
})
export class LeftNavViewComponent implements OnInit {
  @Input() self?: User | null;
  @Output() logout = new EventEmitter();

  expanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }

  onLogout(): void {
    this.logout.emit();
  }
}

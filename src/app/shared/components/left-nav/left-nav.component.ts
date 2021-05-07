import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
})
export class LeftNavComponent implements OnInit {
  expanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }
}

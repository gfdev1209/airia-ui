import { Component, Input, OnInit } from '@angular/core';
import { MenuLink } from '@shared/models';

@Component({
  selector: 'app-interior-nav',
  templateUrl: './interior-nav.component.html',
  styleUrls: ['./interior-nav.component.scss'],
})
export class InteriorNavComponent implements OnInit {
  @Input() title = '';
  @Input() links: MenuLink[] = [];

  constructor() {}

  ngOnInit() {}
}

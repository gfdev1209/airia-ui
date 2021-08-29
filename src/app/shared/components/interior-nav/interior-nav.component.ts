import { Component, Input, OnInit } from '@angular/core';
import { MenuLink } from '@shared/models';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-interior-nav',
  templateUrl: './interior-nav.component.html',
  styleUrls: ['./interior-nav.component.scss'],
})
export class InteriorNavComponent implements OnInit {
  @Input() title = '';
  @Input() links: MenuItem[] = [];
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];
  }
}

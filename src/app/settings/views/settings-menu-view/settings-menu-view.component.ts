import { Component, OnInit } from '@angular/core';
import { MenuLink } from '@shared/models';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings-menu-view',
  templateUrl: './settings-menu-view.component.html',
  styleUrls: ['./settings-menu-view.component.scss'],
})
export class SettingsMenuViewComponent implements OnInit {
  menuLinks: MenuItem[] = [
    // {
    //   title: 'Personal Details',
    //   route: '/settings/personal',
    //   description: 'Personal Information, Notifications',
    //   icon: 'fa-user',
    // },
    {
      label: 'User Management',
      routerLink: '/settings/users',
      title: 'Roles, Access Levels',
      icon: 'fa-key',
    },
    {
      label: 'Buildings',
      routerLink: '/settings/buildings',
      title: 'Edit Details, Floors, Occupancy',
      icon: 'fa-building',
    },
    {
      label: 'Regions',
      routerLink: '/settings/regions',
      title: 'Edit Regions',
      icon: 'fa-draw-polygon',
    },
    {
      label: 'Access Points',
      routerLink: '/settings/access-points',
      title: 'Edit Access Point Details',
      icon: 'fa-router',
    },
    // {
    //   title: 'Appearance',
    //   route: '/settings/appearance',
    //   description: 'Dark and Light mode',
    //   icon: 'fa-adjust',
    // },
  ];

  constructor() {}

  ngOnInit() {}
}

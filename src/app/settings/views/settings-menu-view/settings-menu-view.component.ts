import { Component, OnInit } from '@angular/core';
import { MenuLink } from '@shared/models';

@Component({
  selector: 'app-settings-menu-view',
  templateUrl: './settings-menu-view.component.html',
  styleUrls: ['./settings-menu-view.component.scss'],
})
export class SettingsMenuViewComponent implements OnInit {
  menuLinks: MenuLink[] = [
    // {
    //   title: 'Personal Details',
    //   route: '/settings/personal',
    //   description: 'Personal Information, Notifications',
    //   icon: 'fa-user',
    // },
    {
      title: 'User Management',
      route: '/settings/users',
      description: 'Roles, Access Levels',
      icon: 'fa-key',
    },
    {
      title: 'Buildings',
      route: '/settings/buildings',
      description: 'Edit Details, Floors, Occupancy',
      icon: 'fa-building',
    },
    {
      title: 'Access Points',
      route: '/settings/access-points',
      description: 'Edit Access Point Details',
      icon: 'fa-router',
    },
    {
      title: 'Appearance',
      route: '/settings/appearance',
      description: 'Dark and Light mode',
      icon: 'fa-adjust',
    },
  ];

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
})
export class LeftNavComponent implements OnInit {
  expanded = false;

  constructor(private authService: MsalService) {}

  ngOnInit(): void {}

  toggleSize(): void {
    this.expanded = !this.expanded;
  }

  logout(): void {
    this.authService.logoutRedirect({ postLogoutRedirectUri: '/login' });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'airia';
  isIframe = false;
  constructor() {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }
}

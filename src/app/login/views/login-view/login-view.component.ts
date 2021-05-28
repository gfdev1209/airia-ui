import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
  @Output() login = new EventEmitter();

  constructor() {}

  onLogin(): void {
    this.login.emit();
  }
}

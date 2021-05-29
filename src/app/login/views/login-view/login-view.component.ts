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
  onRegister(): void {
    window.location.href =
      'https://airia20develop.b2clogin.com/airia20develop.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_airiasignupin&client_id=c5f385f7-8c81-4623-8c7c-a9bdb5929559&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&scope=openid&response_type=id_token&prompt=login';
  }
}
//https://likwidteststorage.blob.core.windows.net/web/customized-ui.html

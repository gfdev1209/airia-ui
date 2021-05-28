import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginComponent, LoginViewComponent],
  imports: [CommonModule, SharedModule],
  exports: [],
  providers: [],
})
export class LoginModule {}

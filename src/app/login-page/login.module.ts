import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoginPage } from './login-page';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    FaIconComponent,
  ],
  exports: [LoginPage]
})
export class LoginModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoginPage } from './login-page';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    FaIconComponent,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports: [LoginPage]
})
export class LoginModule {
}

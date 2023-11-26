import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public async login() {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    try {
      const token = await lastValueFrom(this.loginService.login(this.loginForm.value));
      if (token) {
        await this.router.navigate(['/users'])
      }
    } catch (e) {
      console.log(e);
    }
  }
}

import { Injectable } from '@angular/core';
import { LoginClient } from '../client/login.client';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { map, Observable } from 'rxjs';
import { UserModel } from '../../users/client/model/user.model';
import { UserBo } from '../../users/bo/user.bo';
import { TokenService } from '../../service/token.service';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private loginClient: LoginClient,
              private tokenService: TokenService) {
  }

  public login(loginFormValue: any): Observable<UserBo> {
    const loginDto = new LoginDto(loginFormValue);
    return this.loginClient.login(loginDto)
      .pipe(
        map((userModel: UserModel) => {
          const userBo = new UserBo(userModel);
          this.tokenService.setTokenLocalStorage(userBo);
          this.tokenService.$authenticationSubject.next(userBo);
          return userBo;
        })
      );
  }

  public register(loginFormValue: any) {
    const registerDto = new RegisterDto(loginFormValue);
    return this.loginClient.register(registerDto);
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ClientBase } from '../../client.base';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserModel } from '../../users/client/model/user.model';

@Injectable({providedIn: 'root'})
export class LoginClient extends ClientBase {
  private url = this.fullUrl + '/Authentication';

  public login(LoginDto: LoginDto): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.url + '/login', LoginDto);
  }

  register(registerDto: RegisterDto) {
    return this.httpClient.post(this.url + '/register', registerDto);
  }
}

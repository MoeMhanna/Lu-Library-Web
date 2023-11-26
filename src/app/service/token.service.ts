import { Injectable } from '@angular/core';
import { UserBo } from '../users/bo/user.bo';
import { Store } from '@ngrx/store';
import { MeActions } from '../+state/me.actions';
import { UserRoleEnum } from '../users/client/enums/user-role.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token: UserBo;
  public $authenticationSubject = new Subject();

  constructor(public store: Store) {
    this.token = JSON.parse(localStorage.getItem('token'));
  }

  get isAuthenticated() {
    return !!this.token;
  }

  get isAdmin() {
    return this.token.role === UserRoleEnum.ADMIN;
  }

  public setTokenLocalStorage(token: UserBo) {
    localStorage.setItem('token', JSON.stringify(token));
    this.store.dispatch(MeActions.loadMe({user: token}));
    this.token = token;
  }
}

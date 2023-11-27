import { Injectable } from '@angular/core';
import { UsersClient } from '../client/users.client';
import { map, Observable } from 'rxjs';
import { UserModel } from '../client/model/user.model';
import * as _ from 'lodash';
import { UserBo } from '../bo/user.bo';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private usersClient: UsersClient) {
  }

  public getUsers() {
    return this.usersClient.getUsers()
      .pipe(
        map((userModelList: Array<UserModel>) => {
          return _.map(userModelList, (userModel: UserModel) => {
            return new UserBo(userModel);
          })
        })
      )
  }

  public getUserById(id: string): Observable<UserBo> {
    return this.usersClient.getUserById(id)
      .pipe(
        map((userModel: UserModel) => {
          return new UserBo(userModel);
        })
      )
  }

  public createUser(user: any) {
    const userForCreationDto = new (user)
    return this.usersClient.createUser(userForCreationDto);
  }

  public updateUser(user: UserModel) {
    return this.usersClient.updateUser(user)
      .pipe(
        map((userModel: UserModel) => {
          return new UserBo(userModel);
        })
      )
  }

  public deleteUser(id: string): Observable<any> {
    return this.usersClient.deleteUser(id)
  }
}

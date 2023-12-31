import { ClientBase } from '../../client.base';
import { Observable } from 'rxjs';
import { UserModel } from './model/user.model';
import { Injectable } from '@angular/core';
import { UserForCreationDto } from '../dto/user-for-creation.dto';

@Injectable({providedIn: 'root'})
export class UsersClient extends ClientBase {
  private url = this.fullUrl + '/Users';

  public getUsers(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(this.url);
  }

  public getUserById(id: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.url}/${id}`);
  }

  public createUser(user: UserForCreationDto): Observable<any> {
    return this.httpClient.post<UserForCreationDto>(this.url, user);
  }

  public updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(this.url, user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<UserModel>(`${this.url}/${id}`);
  }
}

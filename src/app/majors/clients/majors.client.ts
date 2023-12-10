import { ClientBase } from '../../client.base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MajorsModel } from '../models/majors.model';

@Injectable({providedIn: 'root'})
export class MajorsClient extends ClientBase {
  private url = this.fullUrl + '/Category';

  public getMajors(): Observable<Array<MajorsModel>> {
    return this.httpClient.get<Array<MajorsModel>>(this.url);
  }

  public getMajor(id: number): Observable<MajorsModel> {
    return this.httpClient.get<MajorsModel>(this.url + '/' + id);
  }

  // addMajor(major: MajorsModel) {
  //   return this.httpClient.post(this.url, major);
  // }

  public deleteMajor(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }
}

import { Injectable } from '@angular/core';
import { MajorsClient } from '../clients/majors.client';
import { map, Observable } from 'rxjs';
import { MajorsBo } from '../bo/majors.bo';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MajorServices {
  constructor(private majorsClient: MajorsClient) {
  }

  public getMajors():Observable<Array<MajorsBo>> {
    return this.majorsClient.getMajors()
      .pipe(
        map((majors) => {
            return _.map(majors, (major) => {
              return new MajorsBo(major);
            });
          }
        )
      );
  }

  public getMajorById(id: number) {
    return this.majorsClient.getMajor(id)
      .pipe(
        map((major) => {
          return new MajorsBo(major);
        })
      );
  }

  // addMajor(major: MajorsModel) {
  //   return this.majorsClient.addMajor(major);
  // }

  public deleteMajor(id: number) {
    return this.majorsClient.deleteMajor(id);
  }
}

import { Injectable } from '@angular/core';
import { MajorsClient } from '../clients/majors.client';
import { map, Observable } from 'rxjs';
import { MajorsBo } from '../bo/majors.bo';
import * as _ from 'lodash';
import { DonutChartIDataInterface } from '../../components/donut-chart/donut-chart.component';
import { MajorForCreationDto } from '../dto/major-for-creation.dto';

@Injectable({
  providedIn: 'root'
})
export class MajorServices {
  constructor(private majorsClient: MajorsClient) {
  }

  public getMajors(): Observable<Array<MajorsBo>> {
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

  public addMajor(categoryName: string) {
    const majorForCreationDto = new MajorForCreationDto(categoryName);
    return this.majorsClient.addMajor(majorForCreationDto);
  }

  public deleteMajor(id: number) {
    return this.majorsClient.deleteMajor(id);
  }

  public getMajorsBooksNumber(majorsList: Array<MajorsBo>): Array<DonutChartIDataInterface> {
    return _.map(majorsList, (major) => {
      return {
        value: major.booksNumber,
        category: major.categoryName
      }
    });
  }

  public getMajorsDownloadNumber(majorsList: Array<MajorsBo>): Array<DonutChartIDataInterface> {
    return _.map(majorsList, (major) => {
      return {
        value: major.downloadNumber,
        category: major.categoryName
      }
    });
  }
}

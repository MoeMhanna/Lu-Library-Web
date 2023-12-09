import { MajorsModel } from '../models/majors.model';

export class MajorsBo {
  categoryName: string;
  booksNumber: number;
  downloadNumber: number;

  constructor(majorsModel: MajorsModel) {
    this.categoryName = majorsModel.categoryName;
    this.booksNumber = majorsModel.booksNumber;
    this.downloadNumber = majorsModel.downloadNumber;
  }
}

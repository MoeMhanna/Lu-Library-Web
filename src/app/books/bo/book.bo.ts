import { BookModel } from '../clients/model/book.model';

export class BookBo {
  id: string;
  bookName: string;
  writer: string;
  description: string;
  category: string;

  constructor(bookModel: BookModel) {
    this.id = bookModel.id;
    this.bookName = bookModel.bookName;
    this.writer = bookModel.writer;
    this.description = bookModel.description;
    this.category = bookModel.category;
  }
}

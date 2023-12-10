import { Injectable } from '@angular/core';
import { BooksClient } from '../clients/books.client';
import { map, Observable } from 'rxjs';
import { BookForUploadDto } from '../dto/book-for-upload.dto';
import { BookBo } from '../bo/book.bo';
import { BookModel } from '../clients/model/book.model';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private booksClient: BooksClient) {
  }

  public getBooks(): Observable<Array<BookBo>> {
    return this.booksClient.getBooks()
      .pipe(
        map((bookModels: Array<BookModel>) => {
          return _.map(bookModels, (bookModel: BookModel) => new BookBo(bookModel)
          )
        })
      )
  }

  public getBookById(id: string): Observable<BookBo> {
    return this.booksClient.getBookById(id)
      .pipe(
        map((bookModel: BookModel) => {
          return new BookBo(bookModel);
        })
      )
  }

  public downloadBookById(id: string): Observable<any> {
    return this.booksClient.downloadBookById(id);
  }

  public createUser(bookForUploadFormValue: any, bookFile: File): Observable<any> {
    const bookForUploadDto = new BookForUploadDto(bookForUploadFormValue, bookFile);
    return this.booksClient.createUser(bookForUploadDto);
  }
}

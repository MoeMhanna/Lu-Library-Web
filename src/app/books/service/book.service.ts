import { Injectable } from '@angular/core';
import { BooksClient } from '../clients/books.client';
import { Observable } from 'rxjs';
import { BookForUploadDto } from '../dto/book-for-upload.dto';

@Injectable({providedIn: 'root'})
export class BookService {
  constructor(private booksClient: BooksClient) {
  }

  public createUser(bookForUploadFormValue: any, bookFile: File): Observable<any> {
    console.log(bookFile);
    const bookForUploadDto = new BookForUploadDto(bookForUploadFormValue, bookFile);
    return this.booksClient.createUser(bookForUploadDto);
  }
}

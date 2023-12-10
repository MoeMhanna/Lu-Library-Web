import { Observable, tap } from 'rxjs';

import { ClientBase } from '../../client.base';
import { BookForUploadDto } from '../dto/book-for-upload.dto';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BookModel } from './model/book.model';

@Injectable({providedIn: 'root'})

export class BooksClient extends ClientBase {
  private url = this.fullUrl + '/Books';

  public createUser(book: BookForUploadDto): Observable<any> {
    const httpHeaders = new HttpHeaders({'enctype': 'multipart/form-data'});
    return this.httpClient.post<any>(this.url, book.bookFormData, {headers: httpHeaders});
  }

  public getBooks(): Observable<Array<BookModel>> {
    return this.httpClient.get<Array<BookModel>>(this.url);
  }

  public getBookById(id: string): Observable<BookModel> {
    return this.httpClient.get<BookModel>(this.url + '/' + id);
  }

  public createBook(book: BookModel): Observable<any> {
    return this.httpClient.post<any>(this.url, book);
  }

  public downloadBookById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/download/' + id, {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders().append('Content-Type', 'application/pdf')
    })
      .pipe(
        tap(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = blob.url; // Replace with dynamic book name if available
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
      );
  }
}

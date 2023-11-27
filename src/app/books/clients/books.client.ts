import { Observable } from 'rxjs';

import { ClientBase } from '../../client.base';
import { BookForUploadDto } from '../dto/book-for-upload.dto';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class BooksClient extends ClientBase {
  private url = this.fullUrl + '/Books';

  public createUser(book: BookForUploadDto): Observable<any> {
    const httpHeaders = new HttpHeaders({ "enctype": "multipart/form-data" });
    return this.httpClient.post<any>(this.url, book.bookFormData,{ headers: httpHeaders });
  }
}

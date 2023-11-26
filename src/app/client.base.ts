import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientBase {
  constructor(protected httpClient: HttpClient) {
  }

  private _fullUrl= "http://localhost:8080";

  protected get fullUrl() {
    return `${this._fullUrl}`;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../service/book.service';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { BooksActions } from '../+state/books.actions';

@Component({
  templateUrl: 'book-upload-modal.html',
  styleUrls: ['book-upload-modal.scss']
})
export class BookUploadModal {
  public bookForm: FormGroup;
  private bookFile: File;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private bookService: BookService) {
    this.bookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      writer: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.bookForm.valid) {
      this.store.dispatch(BooksActions.createBooks({
        bookForUploadFormValue: this.bookForm.value,
        bookFile: this.bookFile
      }));
    }
  }

  selectFile($event: any) {
    this.bookFile = _.first($event.target.files)
  }
}

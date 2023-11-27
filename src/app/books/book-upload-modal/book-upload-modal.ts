import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { BookService } from '../service/book.service';
import * as _ from 'lodash';

@Component({
  templateUrl: 'book-upload-modal.html',
  styleUrls: ['book-upload-modal.scss']
})
export class BookUploadModal {
  public bookForm: FormGroup;
  private bookFile: File;

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService) {
    this.bookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      writer: ['', Validators.required],
      description: [''],
      category: [{categoryName: 'Math'}],
    });
  }

  async onSubmit() {
    if (this.bookForm.valid) {
      await lastValueFrom(this.bookService.createUser(this.bookForm.value, this.bookFile))
    }
  }

  selectFile($event: any) {
    this.bookFile = _.first($event.target.files)
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BooksPage } from './books-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonModule } from '../shared/components/action-button/action-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BooksRoutingModule } from './books-routing.module';
import { BookUploadModule } from './book-upload-modal/book-upload.module';
import { LetDirective } from '@ngrx/component';
import { BooksDetailsModule } from './book-details/books-details.module';

@NgModule({
  declarations: [BooksPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    ActionButtonModule,
    MatDialogModule,
    BookUploadModule,
    BooksRoutingModule,
    BooksDetailsModule,
    LetDirective
  ],
  exports: [BooksPage]
})
export class BooksModule {
}

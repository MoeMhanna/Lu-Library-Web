import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BooksDetailsPage } from './books-details-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';

@NgModule({
  declarations: [BooksDetailsPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    MatDialogModule,
    LetDirective
  ],
  exports: [BooksDetailsPage]
})
export class BooksDetailsModule {
}

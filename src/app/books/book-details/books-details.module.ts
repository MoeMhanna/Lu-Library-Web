import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BooksDetailsPage } from './books-details-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { ReviewsModule } from '../../reviews/reviews.module';

@NgModule({
  declarations: [BooksDetailsPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    MatDialogModule,
    LetDirective,
    ReviewsModule
  ],
  exports: [BooksDetailsPage]
})
export class BooksDetailsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ReviewsPage } from './reviews-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonModule } from '../shared/components/action-button/action-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { ReviewUploadModule } from './add-review/review-upload.module';

@NgModule({
  declarations: [ReviewsPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    ActionButtonModule,
    MatDialogModule,
    LetDirective,
    ReviewUploadModule
  ],
  exports: [ReviewsPage]
})
export class ReviewsModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MajorsPage } from './majors-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonModule } from '../shared/components/action-button/action-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MajorsRoutingModule } from './majors-routing.module';
import { LetDirective } from '@ngrx/component';
import { MajorForCreationModule } from './major-creation-modal/major-for-creation.module';

@NgModule({
  declarations: [MajorsPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    ActionButtonModule,
    MatDialogModule,
    MajorsRoutingModule,
    LetDirective,
    MajorForCreationModule
  ],
  exports: [MajorsPage]
})
export class MajorsModule {
}

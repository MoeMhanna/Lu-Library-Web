import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UsersModalComponent } from './users-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [UsersModalComponent],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
  ],
  exports: [UsersModalComponent]
})
export class UsersModule {
}

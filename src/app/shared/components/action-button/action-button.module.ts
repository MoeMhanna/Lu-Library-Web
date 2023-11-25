import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonComponent } from './action-button.component';

@NgModule({
  declarations: [ActionButtonComponent],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
  ],
  exports: [ActionButtonComponent]
})
export class ActionButtonModule {
}

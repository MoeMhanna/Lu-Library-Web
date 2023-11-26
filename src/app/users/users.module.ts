import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UsersPage } from './users-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonModule } from '../shared/components/action-button/action-button.module';
import { UserCreationModule } from './user-creation-modal/user-creation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    ActionButtonModule,
    UserCreationModule,
    MatDialogModule,
    UsersRoutingModule
  ],
  exports: [UsersPage]
})
export class UsersModule {
}

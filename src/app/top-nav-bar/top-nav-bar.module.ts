import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavBarComponent } from './top-nav-bar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TopNavBarComponent],
  imports: [
    CommonModule,
    FaIconComponent,
  ],
  exports: [TopNavBarComponent]
})
export class TopNavBarModule {
}

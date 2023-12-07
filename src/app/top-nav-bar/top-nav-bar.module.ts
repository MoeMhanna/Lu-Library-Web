import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavBarComponent } from './top-nav-bar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [TopNavBarComponent],
    imports: [
        CommonModule,
        FaIconComponent,
        RouterLink,
    ],
  exports: [TopNavBarComponent]
})
export class TopNavBarModule {
}

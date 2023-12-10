import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LandingPage } from './landing-page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActionButtonModule } from '../shared/components/action-button/action-button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingRoutingModule } from './landing-routing.module';
import { DonutChartModule } from '../components/donut-chart/donut-chart.module';
import { HistogramChartModule } from '../components/histogram-chart/histogram-chart.module';
import { LetDirective } from '@ngrx/component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [LandingPage],
  imports: [
    CommonModule,
    FaIconComponent,
    NgxDatatableModule,
    ActionButtonModule,
    MatDialogModule,
    LandingRoutingModule,
    DonutChartModule,
    HistogramChartModule,
    LetDirective,
    UsersModule
  ],
  exports: [LandingPage]
})
export class LandingModule {
}

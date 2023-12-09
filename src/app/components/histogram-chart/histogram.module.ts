import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistogramChart } from './histogram-chart';

@NgModule({
  declarations: [HistogramChart],
  imports: [
    CommonModule,
  ],
  exports: [HistogramChart]
})
export class HistogramModule {
}

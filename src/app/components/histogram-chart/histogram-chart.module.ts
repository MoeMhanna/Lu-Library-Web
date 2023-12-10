import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HistogramChartComponent } from './histogram-chart.component';

@NgModule({
	declarations: [HistogramChartComponent],
	imports: [
		CommonModule
	],
	exports: [HistogramChartComponent]
})
export class HistogramChartModule {
}

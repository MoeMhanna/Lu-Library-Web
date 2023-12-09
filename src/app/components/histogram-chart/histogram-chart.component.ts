import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import { Root } from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { CategoryAxis, ColumnSeries, ValueAxis, XYChart } from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { UUID } from 'angular2-uuid';
import { HistogramBinInterface } from './interface/histogram-bin.interface';

@Component({
	selector: 'histogram-chart',
	template: `
		<div [style]="{
			'width': width + 'px',
			'height': height + 'px'
			}" id="{{uuidChart}}">
		</div>
	`,
	styleUrls: ['./histogram-chart.component.scss']
})
export class HistogramChartComponent implements AfterViewInit, OnChanges, OnDestroy {
	@Input() dataList: Array<HistogramBinInterface>;
	@Input() color: string;
	@Input() height: number;
	@Input() width: number;
	@Input() noDataModalText: string = 'No data available!';
	public uuidChart = UUID.UUID();
	private chart?: XYChart;
	private xAxis?: CategoryAxis<any>;
	private series?: ColumnSeries;

	private root?: Root;
	private noDataModal: am5.Modal;

	async ngAfterViewInit() {
		this.root = am5.Root.new(this.uuidChart);
		this.root.setThemes([am5themes_Animated.new(this.root)]);

		this.noDataModal = am5.Modal.new(this.root, { content: this.noDataModalText });

		this.chart = this.createChart();
		this.xAxis = this.createXAxis();
		const yAxis = this.createYAxis();
		this.series = this.createSeries(this.xAxis, yAxis);
		this.setData();
		await this.animate();
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	ngOnChanges(): void {
		this.updateData();
		this.toggleNoDataModal();
	}

	private toggleNoDataModal() {
		if (this.dataList?.length && this.noDataModal?.isOpen()) {
			this.noDataModal?.close();
		}
		if (!this.dataList?.length && !this.noDataModal?.isOpen()) {
			this.noDataModal?.open();
		}
	}

	private createChart(): XYChart {
		const chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
			panX: true,
			panY: true,
			wheelX: 'panX',
			wheelY: 'zoomX',
			height: am5.percent(100),
			pinchZoomX: true
		}));
		const cursor = chart.set('cursor', am5xy.XYCursor.new(this.root, {}));
		cursor.lineY.set('visible', false);
		return chart;
	}

	private createXAxis(): CategoryAxis<any> {
		const renderer = am5xy.AxisRendererX.new(this.root, { minGridDistance: 30 });
		renderer.labels.template.setAll({
			rotation: -90,
			centerY: am5.p100,
			centerX: am5.p100,
			paddingRight: 15
		});
		renderer.grid.template.setAll({ visible: false });
		return this.chart!.xAxes.push(am5xy.CategoryAxis.new(this.root, {
			maxDeviation: 0.3,
			categoryField: 'bin',
			renderer: renderer,
			tooltip: am5.Tooltip.new(this.root, {})
		}));
	}

	private createYAxis(): ValueAxis<any> {
		return this.chart!.yAxes.push(am5xy.ValueAxis.new(this.root, {
			maxDeviation: 0.3,
			renderer: am5xy.AxisRendererY.new(this.root, {})
		}));
	}

	private createSeries(xAxis: CategoryAxis<any>, yAxis: ValueAxis<any>): ColumnSeries {
		const series = this.chart!.series.push(am5xy.ColumnSeries.new(this.root, {
			name: 'openHistogram',
			xAxis: xAxis,
			yAxis: yAxis,
			valueYField: 'value',
			categoryXField: 'bin',
			tooltip: am5.Tooltip.new(this.root, { labelText: '{valueY}' })
		}));
		series.columns.template.setAll({
			fill: am5.color(this.color || '#0c2697'),
			cornerRadiusTL: 3,
			cornerRadiusTR: 3
		});
		series.columns.template.adapters.add('fill', (fill: any, target: any) => {
			return target.dataItem.dataContext['color'] || this.color;
		});
		return series;
	}

	private setData() {
		if (this.dataList?.length) {
			this.xAxis?.data.setAll(this.dataList);
			this.series?.data.setAll(this.dataList);
			if (this.noDataModal.isOpen()) {
				this.noDataModal.close();
			}
		} else {
			this.noDataModal = am5.Modal.new(this.root, { content: this.noDataModalText });
			this.noDataModal.open();
		}
	}

	private updateData() {
		if (this.dataList && this.xAxis && this.series) {
			this.xAxis.data.setAll(this.dataList);
			this.series.data.setAll(this.dataList);
		}
	}

	private async animate() {
		await this.series!.appear(0);
		await this.chart!.appear(0, 0);
	}
}

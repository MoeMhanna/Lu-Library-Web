import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5 from '@amcharts/amcharts5';
import { UUID } from 'angular2-uuid';

import * as _ from 'lodash';

declare const Gradient: any;

export interface DonutChartIDataInterface {
  value: number;
  category?: string;
  readableValue?: string;
}

@Component({
  selector: 'donut-chart',
  template: `
    <div [style]="{
			'width': width || '100%',
			'height': height,
			}" id="{{uuidChart}}">
    </div>
  `,
  // styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() dataList: Array<DonutChartIDataInterface> = [
    {value: 100, category: 'Research'},
    {value: 200, category: 'Marketing'},
    {value: 300, category: 'Sales'},
  ];
  @Input() maxGradientColor: string;
  @Input() minGradientColor: string;
  @Input() height: string = '275px';
  @Input() width: string;
  @Input() middleTextXPercentage: number = 275;
  @Input() middleTextYPercentage: number = 275;
  public uuidChart = UUID.UUID();
  private chart: any;
  private series: any;
  private root: am5.Root;
  private noContentModal: am5.Modal;

  async ngAfterViewInit() {
    this.root = am5.Root.new(this.uuidChart);
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create chart
    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(70)
      }));

    this.series = this.chart.series
      .push(am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'category'
      }));

    this.series.labels.template.setAll({
      text: '{valuePercentTotal.formatNumber(\'0.00\')}%',
      centerX: 0,
      centerY: 0
    });
    this.series.labels.template.setAll({
      valign: 'middle'
    });
    this.series.slices.template
      .set('tooltipText', '{category} {valuePercentTotal.formatNumber(\'0.00\')}%');

    this.series.labels.template.adapters.add('forceHidden', forceHidden);
    this.series.ticks.template.adapters.add('forceHidden', forceHidden);

    function forceHidden(hidden: string, target: any) {
      return target.dataItem.get('valuePercentTotal') === 0;
    }

    await this.series.appear(0, 0);
    if (_.size(this.dataList)) {
      this.updateChartData();
    } else {
      this.showNoContent();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataList'] && this.series) {
      if (this.dataList?.length > 0) {
        this.hideNoContent();
        this.updateChartData();
      } else {
        this.showNoContent();
      }
    }
  }

  private updateChartData() {
+    this.series.data.setAll(this.dataList);
    this.series.labels.template.setAll({
      text: '{valuePercentTotal.formatNumber(\'0.00\')}%'
    });
  }

  private showNoContent() {
    this.series.data.setAll([{value: 1, category: 'No content available'}]);
    this.series.labels.template.setAll({
      textType: 'circular',
      text: '{category}',
      centerX: 0,
      centerY: 0
    });

    this.series.get('colors').set('colors', [this.maxGradientColor]);

    if (this.noContentModal) {
      this.noContentModal.close();
    }
    this.noContentModal = am5.Modal.new(this.root, {content: 'No content available!'});
    this.noContentModal.open();
  }

  private hideNoContent() {
    if (this.noContentModal?.isOpen()) {
      this.noContentModal.close();
    }
  }

  // private setGradientColors() {
  //   const gradientColorList: Array<string> = new Gradient()
  //     .setColorGradient(this.minGradientColor, this.maxGradientColor)
  //     .setMidpoint(this.dataList?.length)
  //     .getColors();
  //   this.series.get('colors').set('colors', gradientColorList);
  // }
}

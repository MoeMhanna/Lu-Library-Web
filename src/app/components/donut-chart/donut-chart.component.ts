import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5 from '@amcharts/amcharts5';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import Gradient from 'javascript-color-gradient';

export interface DonutChartIDataInterface {
  value: number;
  category?: string;
  readableValue?: string;
}

@Component({
  selector: 'donut-chart',
  template: `
      <div [style]="{
			'width': '400px',
			'height': '400px',
			}" id="{{uuidChart}}">
      </div>
  `
})
export class DonutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() dataList: Array<DonutChartIDataInterface>;
  @Input() maxGradientColor: string;
  @Input() minGradientColor: string;
  @Input() height: string;
  @Input() width: string;
  public uuidChart = UUID.UUID();
  private chart: any;
  private series: any;
  private root: am5.Root;
  private noContentModal: am5.Modal;

  async ngAfterViewInit() {
    this.root = am5.Root.new(this.uuidChart);
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(70),
      }));

    this.series = this.chart.series
      .push(am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false
      }));

    this.series.labels.template.setAll({
      textType: 'circular',
      centerX: 0,
      centerY: 0
    });
    // this.series.labels.template.setAll({
    //   valign: 'middle'
    // });
    // this.series.slices.template
    //   .set('tooltipText', '{category} {valuePercentTotal.formatNumber(\'0.00\')}%');

    // this.series.labels.template.adapters.add('forceHidden', forceHidden);
    // this.series.ticks.template.adapters.add('forceHidden', forceHidden);

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
    if (this.series) {
      if (this.dataList) {
        this.hideNoContent();
        this.updateChartData();
      } else {
        this.showNoContent();
      }
    }
  }

  private updateChartData() {
    if (this.dataList) {
      this.setGradientColors();
    }
    this.series.data.setAll(this.dataList);
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

  private setGradientColors() {
    const gradientColorList: Array<string> = new Gradient()
      .setColorGradient(this.minGradientColor, this.maxGradientColor)
      .setMidpoint(this.dataList?.length)
      .getColors();
    this.series.get('colors').set('colors', gradientColorList);
  }
}

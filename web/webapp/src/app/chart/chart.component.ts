import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Chart from 'chart.js';
import $ from 'jquery';
import { Dataset } from '../dataset';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartOptions: any;
  @Input() chartData: any;
  @Input() chartType = 'bar';
  @ViewChild('canvas') canvas: ElementRef;
  allSets: [{ enabled: boolean; dataset: Dataset }];
  chart;
  constructor() {
  }

  ngOnInit() {
    this.allSets = this.chartData.datasets.map(s => ({ enabled: true, dataset: s }));
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }

  onToggleSelect(setWrapper) {
    const chartDatasets = this.chartData.datasets;
    if (setWrapper.enabled) {
      const index = chartDatasets.indexOf(setWrapper.dataset);
      chartDatasets.splice(index, 1);
    } else {
      this.chartData.datasets.push(setWrapper.dataset);
    }

    setWrapper.enabled = !setWrapper.enabled;
    this.chart.update();
  }

}

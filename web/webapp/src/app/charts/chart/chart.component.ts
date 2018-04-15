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
  @Input() chartType = 'line';
  @ViewChild('canvas') canvas: ElementRef;
  allSets: [{ enabled: boolean; dataset: Dataset }];
  chart;
  constructor() {
  }

  ngOnInit() {
    this.allSets = this.chartData.datasets.map(s => ({ enabled: true, dataset: s }));
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }

  onToggleSelect(datasetWrapper) {
    const chartDatasets = this.chartData.datasets;
    if (datasetWrapper.enabled) {
      const index = chartDatasets.indexOf(datasetWrapper.dataset);
      chartDatasets.splice(index, 1);
    } else {
      this.chartData.datasets.push(datasetWrapper.dataset);
    }

    datasetWrapper.enabled = !datasetWrapper.enabled;
    this.chart.update();
  }

}

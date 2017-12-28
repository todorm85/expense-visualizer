import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import Chart from 'chart.js';
import $ from 'jquery'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chartOptions: any;
  @Input() chartData: any;
  @Input() chartType: string = 'bar';
  @ViewChild('canvas') canvas: ElementRef;

  constructor() { 
  }

  ngOnInit() {
    var myChart = new Chart(this.canvas.nativeElement, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }

}

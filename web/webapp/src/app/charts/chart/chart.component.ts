import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Chart from 'chart.js';
import $ from 'jquery';
import { Dataset } from '../dataset';
import { Transaction } from '../../transactions/transaction';
import { TransactionType } from '../../transactions/transactionType';
import { TransactionsChartUtilsService } from '../transactions-chart-utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  avgTotalsDataset: Dataset;
  totalsDataset: Dataset;
  datasetsByTagAndMonth: Dataset[];
  @Input() allTransactions: Transaction[];
  period: number = 6;
  @ViewChild('canvas') canvas: ElementRef;
  horizontalGridStepSize:number = 500;
  private chart;
  chartTransactions: Transaction[];
  constructor(private utils: TransactionsChartUtilsService) {
  }

  ngOnInit() {
    this.chartTransactions = this.allTransactions.slice();
    this.initChart();
  }

  onFilterClick(fromDate, toDate) {
    fromDate = new Date(fromDate.value);
    toDate = new Date(toDate.value);
    if (fromDate < toDate) {
      this.chartTransactions = this.allTransactions.slice().filter(x => x.date > fromDate && x.date < toDate);
    }

    this.initChart();
  }


  private initChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.initSets(this.chartTransactions);
    const chartOptions = {
      scales: {
        yAxes: [{
          type: 'linear',
          position: 'right',
          ticks: {
            stepSize: this.horizontalGridStepSize
          },
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
            unitStepSize: 1
          }
        }]
      }
    };

    let chartData = { datasets: [].concat(this.totalsDataset, this.avgTotalsDataset, ...this.datasetsByTagAndMonth) };

    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: "line",
      data: chartData,
      options: chartOptions
    });
  }

  private initSets(transactions: Transaction[]) {
    const debitTransactions = transactions.filter(x => x.transactionType === TransactionType.Debit);
    this.datasetsByTagAndMonth = this.utils.getAmountPerMonthForEachTag(debitTransactions);
    this.totalsDataset = this.utils.getAmountPerMonth(debitTransactions, 'totals');
    this.avgTotalsDataset = this.utils.getSimpleMovingAvg(this.totalsDataset, `SMA(${this.period})`, this.period);
  }

  onChartConfigChanged() {
    this.initChart();
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { TransactionsService } from '../app/transactions.service';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './transaction';
import { TransactionType } from './transactionType';
import Chart from 'chart.js';
import $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  transactionsForDetailedView: Transaction[];
  showTransactionsDetailedView: boolean;
  title = 'Expenses visualizer';
  JSON = JSON;
  TransactionType = TransactionType;
  @ViewChild('canvasesContainer') chartsContainer: ElementRef;

  constructor(public service: TransactionsService) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(x => this.onTransactionsReceived(x));
  }

  onTransactionsReceived(transactions: Transaction[]): void {
    let debitTransactions = transactions.filter(x => x.transactionType === TransactionType.Debit);
    let datasetsByTagAndMonth = TransactionsChartUtils.getAmountPerMonthForEachTag(debitTransactions);
    let totalsDataset = TransactionsChartUtils.getAmountPerMonth(debitTransactions);
    let avgTotalsDataset = TransactionsChartUtils.getAvgAmount(totalsDataset);
    
    this.DrawChart([].concat(totalsDataset, avgTotalsDataset), 'totalsAndAvgTotalsDatasets');
    this.DrawChart(datasetsByTagAndMonth, 'datasetsByTag');

    this.transactionsForDetailedView = debitTransactions.filter(x => x.tags.length === 0);
  }

  private DrawChart(datasets: Dataset[], id: string) {
    let $container = $(this.chartsContainer.nativeElement);
    let canvas = $container.find(`#${id}`);
    if (!canvas[0]) {
      canvas = $('<canvas>').width(800).height(400).attr('id', id)
        .css({border: '1px solid black', maxHeight: '400px', maxWidth: '800px'});
      $container.append(canvas);
    }

    var myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        datasets: datasets
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          }]
        }
      }
    });
  }
}

class TransactionsChartUtils {
  static getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getAmountPerMonthForEachTag(transactions: Transaction[]): Dataset[] {
    let color = TransactionsChartUtils.getRandomColor();
    let datasets: Dataset[] = [];
    transactions.forEach(transaction => {
      let tag = transaction.tags[0];
      let year = transaction.date.getFullYear();
      let month = transaction.date.getMonth();
      tag = tag ? tag : 'untagged';
      let datasetIndex = datasets.findIndex(x => x.label === tag);
      if (datasetIndex < 0) {
        color = TransactionsChartUtils.getRandomColor();
        datasets.push({
          label: tag,
          data: [{
            x: new Date(year, month),
            y: transaction.amount
          }],
          backgroundColor: color,
          borderColor: color,
          fill: false
        });
      } else {
        let data = datasets[datasetIndex].data;
        let dataEntryIndex = data.findIndex(x => x.x.getFullYear() === year && x.x.getMonth() === month);
        if (dataEntryIndex >= 0) {
          data[dataEntryIndex].y += transaction.amount;
        } else {
          data.push({
            x: new Date(year, month),
            y: transaction.amount
          })
        }
      }
    });

    return datasets;
  }

  static getAmountPerMonth(transactions: Transaction[]): Dataset {
    let data = [];
    transactions.forEach(transaction => {
      let year = transaction.date.getFullYear();
      let month = transaction.date.getMonth();
      let dataIndex = data.findIndex(x => x.x.getFullYear() === year && x.x.getMonth() === month);
      if (dataIndex >= 0) {
        data[dataIndex].y += transaction.amount;
      } else {
        data.push({
          x: new Date(year, month),
          y: transaction.amount
        })
      }
    });

    let color = TransactionsChartUtils.getRandomColor();
    let dataset: Dataset = {
      label: "total",
      data: data,
      backgroundColor: color,
      borderColor: color,
      fill: false
    };

    return dataset;
  }

  static getAvgAmount(set: Dataset) : Dataset {
    let color = TransactionsChartUtils.getRandomColor();
    let avgDataset: Dataset = {
      label: "average",
      data: [],
      backgroundColor: color,
      borderColor: color,
      fill: false
    };

    let currentEntriesAmountSum = 0;
    set.data.forEach(entry => {
      currentEntriesAmountSum += entry.y;
      avgDataset.data.push({
        x: entry.x,
        y: currentEntriesAmountSum / (avgDataset.data.length + 1)
      })
    });

    return avgDataset;
  }
}

interface Dataset {
  label: string;
  data: Array<{ x: Date; y: number; }>;
  backgroundColor;
  borderColor;
  fill: boolean;
}

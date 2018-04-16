import { Component, OnInit } from '@angular/core';
import { TransactionsChartUtilsService } from '../transactions-chart-utils.service';
import { TransactionsService } from '../../transactions/transactions.service';
import { Transaction } from '../../transactions/transaction';
import { TransactionType } from '../../transactions/transactionType';
import { Dataset } from '../dataset';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {
  avgTotalsDataset: Dataset;
  totalsDataset: Dataset;
  datasetsByTagAndMonth: Dataset[];
  charts: any[];
  allTransactions: Transaction[];
  avgRange: number = 2;
  constructor(private service: TransactionsService, private utils: TransactionsChartUtilsService) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(x => {
    this.allTransactions = x;
    this.initCharts(x);
    });
  }

  initCharts(transactions: Transaction[]): void {
    this.initSets(transactions);
    const chartOptions = {
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            stepSize: 500
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
    this.charts = [];
    this.charts.push({ chartData, chartOptions, id: 'total' });
  }

  private initSets(transactions: Transaction[]) {
    const debitTransactions = transactions.filter(x => x.transactionType === TransactionType.Debit);
    this.datasetsByTagAndMonth = this.utils.getAmountPerMonthForEachTag(debitTransactions);
    this.totalsDataset = this.utils.getAmountPerMonth(debitTransactions, 'totals');
    this.avgTotalsDataset = this.utils.getAvgAmount(this.totalsDataset, 'totals-avg', this.avgRange);
  }

  onFilterClick(fromDate, toDate) {
    fromDate = new Date(fromDate.value);
    toDate = new Date(toDate.value);
    let filtered = this.allTransactions;
    if (fromDate < toDate) {
      filtered = this.allTransactions.slice().filter(x => x.date > fromDate && x.date < toDate);
    }

    this.initCharts(filtered);
  }
}

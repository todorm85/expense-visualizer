import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { TransactionsChartUtilsService } from '../transactions-chart-utils.service';
import { Transaction } from '../transaction';
import { TransactionType } from '../transactionType';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {
  charts: any[] = [];

  constructor(private service: TransactionsService, private utils: TransactionsChartUtilsService) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(x => this.addCharts(x));
  }

  addCharts(transactions: Transaction[]): void {
    const debitTransactions = transactions.filter(x => x.transactionType === TransactionType.Debit);
    const datasetsByTagAndMonth = this.utils.getAmountPerMonthForEachTag(debitTransactions);
    const totalsDataset = this.utils.getAmountPerMonth(debitTransactions, 'totals');
    const avgTotalsDataset = this.utils.getAvgAmount(totalsDataset, 'totals-avg');
    const chartOptions = {
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
    };

    let chartData = { datasets: [].concat(totalsDataset, avgTotalsDataset, datasetsByTagAndMonth) };
    this.charts.push({ chartData, chartOptions, id: 'total' });
  }
}

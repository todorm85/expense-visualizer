import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { TransactionsService } from '../app/transactions.service';
import { Observable } from 'rxjs/Observable';
import { Transaction } from './transaction';
import { TransactionType } from './transactionType';
import { TransactionsChartUtilsService } from './transactions-chart-utils.service';
import { Dataset } from './dataset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transactionsForDetailedView: Transaction[];
  showTransactionsDetailedView: boolean;
  title = 'Expenses visualizer';
  charts: any[] = [];

  JSON = JSON;
  TransactionType = TransactionType;

  constructor(private service: TransactionsService, private utils: TransactionsChartUtilsService) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(x => this.addCharts(x));
  }

  addCharts(transactions: Transaction[]): void {
    let debitTransactions = transactions.filter(x => x.transactionType === TransactionType.Debit);
    let datasetsByTagAndMonth = this.utils.getAmountPerMonthForEachTag(debitTransactions);
    let totalsDataset = this.utils.getAmountPerMonth(debitTransactions, "totals");
    let avgTotalsDataset = this.utils.getAvgAmount(totalsDataset, "totals-avg");
    let chartOptions = {
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

    let chartData = { datasets: [].concat(totalsDataset, avgTotalsDataset) };
    this.charts.push({chartData, chartOptions, id: 'total'})

    chartData = { datasets: datasetsByTagAndMonth };
    this.charts.push({chartData, chartOptions, id: 'byTag'});

    this.transactionsForDetailedView = debitTransactions.filter(x => x.tags.length === 0);
  }
}


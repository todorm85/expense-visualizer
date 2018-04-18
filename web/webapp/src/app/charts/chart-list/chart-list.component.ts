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
  allTransactions: Transaction[];
  charts: any[];

  constructor(private service: TransactionsService) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(x => {
      this.allTransactions = x;
      this.charts = [];
      this.charts.push({});
    });
  }

  addChart() {
    this.charts.push({});
  }
}

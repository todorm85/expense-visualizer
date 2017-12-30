import { Component, OnInit, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionType } from '../transactionType';
import { TransactionsService } from '../transactions.service';
import { TransactionUtilsService } from '../transaction-utils.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  tags: string[];
  JSON = JSON;
  TransactionType = TransactionType;

  filterTag: string;

  transactions: Transaction[];
  allTransactions: Transaction[];
  loading = true;

  constructor(private service: TransactionsService, private transactionUtils: TransactionUtilsService,
    private zone: NgZone) { }

  ngOnInit() {
    this.service.getTransactions().subscribe(transactions => {
      this.loading = false;
      this.allTransactions = transactions;
      this.showTransactions();
      this.tags = this.transactionUtils.getTags(transactions);
      this.tags.push('');
    });
  }

  showTransactions() {
    this.loading = true;
    setTimeout(() => {
      this.filterTransactions();
      this.loading = false;
    }, 0);
  }

  private filterTransactions() {
    if (this.filterTag) {
      this.transactions = this.allTransactions.filter(x => x.tags.find(t => t === this.filterTag));
    } else {
      this.transactions = this.allTransactions.slice();
    }
  }
}

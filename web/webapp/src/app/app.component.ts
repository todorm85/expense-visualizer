import { Component } from '@angular/core';
import { TransactionsService } from '../app/transactions.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  transactions$: Observable<any>;
  title = 'app';
  JSON = JSON;

  constructor(public service: TransactionsService) { }
  
  ngOnInit() {
    this.transactions$ = this.service.getTransactions();
  }
}

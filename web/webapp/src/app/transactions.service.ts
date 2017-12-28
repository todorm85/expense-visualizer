import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { Transaction } from './transaction'

@Injectable()
export class TransactionsService {
  private transactions$: Observable<Transaction[]>;

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    if (!this.transactions$) {
      this.transactions$ = this.http.get("api/transactions")
      .map(x => {
        let elements = <Transaction[]>x;
        elements.forEach(element => {
          element.date = new Date(element.date);
        });
        return elements;
      })
      .publishReplay()
      .refCount();
    }

    return this.transactions$;
  }
}

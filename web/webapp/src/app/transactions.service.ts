import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Transaction} from './transaction'
import 'rxjs/add/operator/map'

@Injectable()
export class TransactionsService {

  constructor(private http: HttpClient,) { }

  getTransactions() : Observable<Transaction[]>
  {
    return this.http.get("api/transactions")
      .map(x => {
        let elements = <Transaction[]>x;
        elements.forEach(element => {
          element.date = new Date(element.date);
        });
        return elements;
      });
  }
}

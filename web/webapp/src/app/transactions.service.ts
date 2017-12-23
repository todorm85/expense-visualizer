import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TransactionsService {

  constructor(private http: HttpClient,) { }

  getTransactions() : Observable<any>
  {
    return this.http.get("api/transactions");
  }
}

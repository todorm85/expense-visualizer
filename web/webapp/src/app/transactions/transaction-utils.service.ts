import { Injectable } from '@angular/core';
import { Transaction } from './transaction';

@Injectable()
export class TransactionUtilsService {

  constructor() { }

  getTags(transactions: Transaction[]) {
    let tags = [];
    transactions.forEach(x => {
      let tag = x.tag;
      if (tags.indexOf(tag) < 0) {
        tags.push(tag);
      }
    });

    return tags;
  }

}

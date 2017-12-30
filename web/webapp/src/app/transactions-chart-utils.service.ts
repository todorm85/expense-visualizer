import { Injectable } from '@angular/core';
import { Dataset } from './dataset';
import { Transaction } from './transaction';

@Injectable()
export class TransactionsChartUtilsService {

  constructor() { }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getAmountPerMonthForEachTag(transactions: Transaction[]): Dataset[] {
    const color = this.getRandomColor();
    const transactionsByTag: Array<{ tag: string, transactions: Array<Transaction> }> = [];
    transactions.forEach(t => {
      let tag = t.tags[0];
      const tagGroupIdx = transactionsByTag.findIndex(x => x.tag === tag);
      if (tagGroupIdx >= 0) {
        transactionsByTag[tagGroupIdx].transactions.push(t);
      } else {
        transactionsByTag.push({ tag, transactions: [t] });
      }
    });

    const datasets: Dataset[] = [];
    transactionsByTag.forEach(tbt => {
      const dataset = this.getAmountPerMonth(tbt.transactions, tbt.tag);
      datasets.push(dataset);
    });

    return datasets;
  }

  getAmountPerMonth(transactions: Transaction[], label: string): Dataset {
    const data = [];
    transactions.forEach(transaction => {
      const year = transaction.date.getFullYear();
      const month = transaction.date.getMonth();
      const dataIndex = data.findIndex(x => x.x.getFullYear() === year && x.x.getMonth() === month);
      if (dataIndex >= 0) {
        data[dataIndex].y += transaction.amount;
      } else {
        data.push({
          x: new Date(year, month),
          y: transaction.amount
        });
      }
    });

    const color = this.getRandomColor();
    const dataset: Dataset = {
      label,
      data: data,
      backgroundColor: color,
      borderColor: color,
      fill: false
    };

    return dataset;
  }

  getAvgAmount(set: Dataset, label: string): Dataset {
    const color = this.getRandomColor();
    const avgDataset: Dataset = {
      label,
      data: [],
      backgroundColor: color,
      borderColor: color,
      fill: false
    };

    let currentEntriesAmountSum = 0;
    set.data.forEach(entry => {
      currentEntriesAmountSum += entry.y;
      avgDataset.data.push({
        x: entry.x,
        y: currentEntriesAmountSum / (avgDataset.data.length + 1)
      });
    });

    return avgDataset;
  }
}

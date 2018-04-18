import { Injectable } from '@angular/core';
import { Dataset } from './dataset';
import { Transaction } from '../transactions/transaction';

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
      let tag = t.tag;
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

  getSimpleMovingAvg(set: Dataset, label: string, period: number): Dataset {
    const color = this.getRandomColor();
    const avgDataset: Dataset = {
      label,
      data: [],
      backgroundColor: color,
      borderColor: color,
      fill: false
    };

    for (let avgEntryIndex = period; avgEntryIndex < set.data.length; avgEntryIndex++) {
      const currentTotalEntry = set.data[avgEntryIndex];
      let allTotalsAmountSum = 0;
      let allTotalsCount = 0;
      for (let totalEntryIndex = avgEntryIndex - period; totalEntryIndex <= avgEntryIndex; totalEntryIndex++) {
        const totalEntry = set.data[totalEntryIndex];
        if (totalEntry) {
          allTotalsCount++;
          allTotalsAmountSum += totalEntry.y;
        }
      }
      
      avgDataset.data.push({
            x: currentTotalEntry.x,
            y: allTotalsAmountSum / allTotalsCount
          });
    }

    return avgDataset;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionsImportComponent } from './transactions-import/transactions-import.component';
import { TransactionUtilsService } from './transaction-utils.service';
import { TransactionsService } from './transactions.service';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionsNavigationComponent } from './transactions-navigation/transactions-navigation.component';

const routes = <Route[]>[
  {
    path: 'transactions', component: TransactionsNavigationComponent, children: [
      { path: '', component: TransactionListComponent },
      { path: 'import', component: TransactionsImportComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [TransactionsService, TransactionUtilsService],
  declarations: [TransactionListComponent, TransactionsImportComponent, TransactionsNavigationComponent]
})
export class TransactionsModule { }

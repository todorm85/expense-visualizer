import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransactionsService } from '../app/transactions.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TransactionsChartUtilsService } from './transactions-chart-utils.service';
import { ChartListComponent } from './chart-list/chart-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { TransactionUtilsService } from './transaction-utils.service';
import { LoadingComponent } from './loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartListComponent,
    TransactionListComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule
  ],
  providers: [TransactionsService, TransactionsChartUtilsService, TransactionUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

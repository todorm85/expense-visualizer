import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransactionsService } from '../app/transactions.service';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TransactionsChartUtilsService } from './transactions-chart-utils.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [TransactionsService, TransactionsChartUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

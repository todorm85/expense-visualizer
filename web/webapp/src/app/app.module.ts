import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from './charts/charts.module';
import { TransactionsModule } from './transactions/transactions.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ChartsModule, TransactionsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartListComponent } from './chart-list/chart-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'chart-list', pathMatch: 'full' },
  { path: 'chart-list', component: ChartListComponent },
  { path: 'transaction-list', component: TransactionListComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

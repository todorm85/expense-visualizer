import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { RouterModule } from '@angular/router';
import { TransactionsChartUtilsService } from './transactions-chart-utils.service';
import { FormsModule } from '@angular/forms';

const chartsRoutes = [
  { path: 'charts',  component: ChartListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chartsRoutes),
    FormsModule
  ],
  exports: [RouterModule],
  providers: [TransactionsChartUtilsService],
  declarations: [ChartComponent, ChartListComponent]
})
export class ChartsModule { }

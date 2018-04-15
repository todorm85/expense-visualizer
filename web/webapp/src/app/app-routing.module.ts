import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartListComponent } from './charts/chart-list/chart-list.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: "charts", pathMatch: "full" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }

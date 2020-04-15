import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'chart',
        loadChildren: './pages/weight-chart/weight-chart.module#WeightChartPageModule'
      },
      {
        path: 'create',
        loadChildren: './pages/weight-save/weight-save.module#WeightSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/weight-save/weight-save.module#WeightSavePageModule'
      },
      {
         path: '',
         loadChildren: './pages/weight-list/weight-list.module#WeightListPageModule'
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightsRoutingModule { }

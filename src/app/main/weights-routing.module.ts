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
        loadChildren: () => import('./pages/weight-chart/weight-chart.module').then(m => m.WeightChartPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/weight-save/weight-save.module').then(m => m.WeightSavePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/weight-save/weight-save.module').then(m => m.WeightSavePageModule)
      },
      {
         path: '',
         loadChildren: () => import('./pages/weight-list/weight-list.module').then(m => m.WeightListPageModule)
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightsRoutingModule { }

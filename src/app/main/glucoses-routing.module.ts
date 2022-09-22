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
        loadChildren: () => import('./pages/glucose-chart/glucose-chart.module').then(m => m.GlucoseChartPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/glucose-save/glucose-save.module').then(m => m.GlucoseSavePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/glucose-save/glucose-save.module').then(m => m.GlucoseSavePageModule)
      },
      {
         path: '',
         loadChildren: () => import('./pages/glucose-list/glucose-list.module').then(m => m.GlucoseListPageModule)
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlucosesRoutingModule { }

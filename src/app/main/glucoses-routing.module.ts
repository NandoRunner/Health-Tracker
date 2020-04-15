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
        loadChildren: './pages/glucose-chart/glucose-chart.module#GlucoseChartPageModule'
      },
      {
        path: 'create',
        loadChildren: './pages/glucose-save/glucose-save.module#GlucoseSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/glucose-save/glucose-save.module#GlucoseSavePageModule'
      },
      {
         path: '',
         loadChildren: './pages/glucose-list/glucose-list.module#GlucoseListPageModule'
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlucosesRoutingModule { }

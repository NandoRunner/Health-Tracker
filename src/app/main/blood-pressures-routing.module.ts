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
        loadChildren: () => import('./pages/blood-pressure-chart/blood-pressure-chart.module').then(m => m.BloodPressureChartPageModule)
      },
      {
        path: 'create',
        loadChildren:
          () => import('./pages/blood-pressure-save/blood-pressure-save.module').then(m => m.BloodPressureSavePageModule)
      },
      {
        path: 'edit/:id',
        loadChildren:
          () => import('./pages/blood-pressure-save/blood-pressure-save.module').then(m => m.BloodPressureSavePageModule)
      },
      {
        path: '',
        loadChildren:
          () => import('./pages/blood-pressure-list/blood-pressure-list.module').then(m => m.BloodPressureListPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressuresRoutingModule { }

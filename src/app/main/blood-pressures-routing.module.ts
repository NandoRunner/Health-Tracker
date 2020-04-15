import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren:
          './pages/blood-pressure-save/blood-pressure-save.module#BloodPressureSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren:
          './pages/blood-pressure-save/blood-pressure-save.module#BloodPressureSavePageModule'
      },
      {
        path: '',
        loadChildren:
          './pages/blood-pressure-list/blood-pressure-list.module#BloodPressureListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressuresRoutingModule { }

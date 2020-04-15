import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { BloodPressureSavePage } from './blood-pressure-save.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPressureSavePage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [BloodPressureSavePage]
})
export class BloodPressureSavePageModule {}

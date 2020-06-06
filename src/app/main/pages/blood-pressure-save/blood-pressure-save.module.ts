import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BloodPressureSavePage } from './blood-pressure-save.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPressureSavePage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BloodPressureSavePage]
})
export class BloodPressureSavePageModule {}

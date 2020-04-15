import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BloodPressureListPage } from './blood-pressure-list.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPressureListPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BloodPressureListPage]
})
export class BloodPressureListPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BloodPressureChartPage } from './blood-pressure-chart.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPressureChartPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BloodPressureChartPage]
})
export class BloodPressureChartPageModule {}

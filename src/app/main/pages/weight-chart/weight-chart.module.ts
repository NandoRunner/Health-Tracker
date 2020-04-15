import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WeightChartPage } from './weight-chart.page';

const routes: Routes = [
  {
    path: '',
    component: WeightChartPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightChartPage]
})
export class WeightChartPageModule {}

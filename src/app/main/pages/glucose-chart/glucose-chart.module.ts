import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GlucoseChartPage } from './glucose-chart.page';

const routes: Routes = [
  {
    path: '',
    component: GlucoseChartPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GlucoseChartPage]
})
export class GlucoseChartPageModule {}

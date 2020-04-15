import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WeightListPage } from './weight-list.page';

const routes: Routes = [
  {
    path: '',
    component: WeightListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightListPage]
})
export class WeightListPageModule {}

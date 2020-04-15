import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GlucoseListPage } from './glucose-list.page';

const routes: Routes = [
  {
    path: '',
    component: GlucoseListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GlucoseListPage]
})
export class GlucoseListPageModule {}

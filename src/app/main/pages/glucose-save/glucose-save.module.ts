import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GlucoseSavePage } from './glucose-save.page';

const routes: Routes = [
  {
    path: '',
    component: GlucoseSavePage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [GlucoseSavePage]
})
export class GlucoseSavePageModule {}
